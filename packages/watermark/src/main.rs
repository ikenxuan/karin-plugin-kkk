#![windows_subsystem = "windows"]

use std::path::PathBuf;
use std::{ffi::OsString, os::windows::ffi::OsStringExt};

use dct_watermark::algorithm::dct_extract_from_rgba;
use chrono::{Local, TimeZone};
use serde_json::Value;
use winio::prelude::*;
use windows::Win32::Foundation::{HWND, LPARAM, LRESULT, WPARAM};
use windows::Win32::UI::Input::KeyboardAndMouse::{GetKeyState, VK_CONTROL, VK_V};
use windows::Win32::System::DataExchange::{CloseClipboard, GetClipboardData, IsClipboardFormatAvailable, OpenClipboard};
use windows::Win32::UI::Shell::{DefSubclassProc, DragAcceptFiles, DragFinish, DragQueryFileW, HDROP, RemoveWindowSubclass, SetWindowSubclass};
use windows::Win32::UI::WindowsAndMessaging::{WM_DROPFILES, WM_KEYDOWN, WM_NCDESTROY, WM_PASTE};
use windows_core::{HSTRING, Interface};
use winui3::Microsoft::UI::Xaml::{Controls as MUXC, Markup::XamlReader};

fn init_logger() {
    use std::io::Write;
    let _ = env_logger::builder()
        .filter_level(log::LevelFilter::Debug)
        .format(|buf, record| {
            writeln!(buf, "[{}] {}", record.level(), record.args())
        })
        .try_init();
}

type Result<T> = std::result::Result<T, winio::Error>;

fn main() -> Result<()> {
    init_logger();
    App::new("com.dctwatermark.winui3")?.run_until_event::<MainModel>(())
}

struct MainModel {
    window: Child<Window>,
    title_label: Child<Label>,
    upload_button: Child<Button>,
    remove_button: Child<Button>,
    reparse_button: Child<Button>,
    result_title: Child<Label>,
    result_text: Child<TextBox>,
    current_image_path: Option<PathBuf>,
}

#[derive(Debug)]
enum Message {
    Noop,
    Close,
    Redraw,
    UploadImage,
    RemoveImage,
    ReparseImage,
    ImportPath(PathBuf),
}

impl Component for MainModel {
    type Error = winio::Error;
    type Event = ();
    type Init<'a> = ();
    type Message = Message;

    async fn init(_init: Self::Init<'_>, _sender: &ComponentSender<Self>) -> Result<Self> {
        init! {
            window: Window = (()) => {
                text: "DCT 盲水印解密",
                size: Size::new(900.0, 600.0),
            },
            title_label: Label = (&window) => {
                text: "DCT 盲水印解密工具",
            },
            upload_button: Button = (&window) => {
                text: "点击上传图片",
            },
            remove_button: Button = (&window) => {
                text: "删除图片",
            },
            reparse_button: Button = (&window) => {
                text: "重新解析",
            },
            result_title: Label = (&window) => {
                text: "水印详情",
            },
            result_text: TextBox = (&window),
        }

        window.set_backdrop(Backdrop::Mica)?;
        window.show()?;
        enable_paste_and_drag_hooks(&window, _sender.clone())?;

        let _ = apply_glyph_icon_to_button(&upload_button, "E8B5", "点击选择或上传图片");
        let _ = apply_compact_glyph_button(&remove_button, "E74D", "删除图片");
        let _ = apply_compact_glyph_button(&reparse_button, "E72C", "重新解析");
        let _ = apply_label_font_size(&title_label, 26.0);
        let _ = apply_label_font_size(&result_title, 18.0);
        let _ = apply_textbox_font_size(&result_text, 13.0);

        Ok(Self {
            window,
            title_label,
            upload_button,
            remove_button,
            reparse_button,
            result_title,
            result_text,
            current_image_path: None,
        })
    }

    async fn start(&mut self, sender: &ComponentSender<Self>) -> ! {
        start! {
            sender, default: Message::Noop,
            self.window => {
                WindowEvent::Close => Message::Close,
                WindowEvent::Resize | WindowEvent::ThemeChanged => Message::Redraw,
            },
            self.upload_button => {
                ButtonEvent::Click => Message::UploadImage,
            },
            self.remove_button => {
                ButtonEvent::Click => Message::RemoveImage,
            },
            self.reparse_button => {
                ButtonEvent::Click => Message::ReparseImage,
            },
        }
    }

    async fn update_children(&mut self) -> Result<bool> {
        update_children!(
            self.window,
            self.title_label,
            self.upload_button,
            self.remove_button,
            self.reparse_button,
            self.result_title,
            self.result_text
        )
    }

    async fn update(
        &mut self,
        message: Self::Message,
        sender: &ComponentSender<Self>,
    ) -> Result<bool> {
        match message {
            Message::Noop => Ok(false),
            Message::Close => {
                sender.output(());
                Ok(false)
            }
            Message::Redraw => Ok(true),
            Message::UploadImage => {
                if let Some(path) = rfd::FileDialog::new()
                    .add_filter("Images", &["png", "jpg", "jpeg", "bmp"])
                    .pick_file()
                {
                    if let Err(err) = process_image(
                        &self.upload_button,
                        &mut self.result_text,
                        &mut self.current_image_path,
                        &path,
                    )
                    .await
                    {
                        let _ = self.result_text.set_text(format!("处理失败: {err:?}"));
                    }
                }
                Ok(true)
            }
            Message::RemoveImage => {
                self.current_image_path = None;
                let _ = apply_glyph_icon_to_button(&self.upload_button, "E8B5", "点击选择或上传图片");
                let _ = self.result_text.set_text("图片已移除，请重新上传");
                Ok(true)
            }
            Message::ReparseImage => {
                if let Some(path) = self.current_image_path.clone() {
                    if let Err(err) = process_image(
                        &self.upload_button,
                        &mut self.result_text,
                        &mut self.current_image_path,
                        &path,
                    )
                    .await
                    {
                        let _ = self.result_text.set_text(format!("处理失败: {err:?}"));
                    }
                } else {
                    let _ = self.result_text.set_text("暂无可重新解析的图片，请先上传");
                }
                Ok(true)
            }
            Message::ImportPath(path) => {
                if let Err(err) = process_image(
                    &self.upload_button,
                    &mut self.result_text,
                    &mut self.current_image_path,
                    &path,
                )
                .await
                {
                    let _ = self.result_text.set_text(format!("处理失败: {err:?}"));
                }
                Ok(true)
            }
        }
    }

    fn render(&mut self, _sender: &ComponentSender<Self>) -> Result<()> {
        let client = self.window.client_size()?;
        let width = client.width;
        let height = client.height;
        let margin = 24.0;
        
        let title_height = 40.0;
        self.title_label.set_loc(Point::new(margin, margin))?;
        self.title_label.set_size(Size::new(width - margin * 2.0, title_height))?;

        let content_y = margin + title_height + 16.0;
        let content_height = height - content_y - margin;
        
        let left_width = (width - margin * 3.0) * 0.55;
        let right_width = (width - margin * 3.0) * 0.45;
        let right_x = margin * 2.0 + left_width;
        let action_height = 40.0;
        let result_title_height = 30.0;
        let panel_spacing = 8.0;
        
        self.upload_button.set_loc(Point::new(margin, content_y))?;
        self.upload_button.set_size(Size::new(left_width, content_height))?;
        let action_y = content_y;
        let action_gap = 8.0;
        let action_width = (right_width - action_gap) / 2.0;
        self.remove_button.set_loc(Point::new(right_x, action_y))?;
        self.remove_button.set_size(Size::new(action_width, action_height))?;
        self.reparse_button.set_loc(Point::new(right_x + action_width + action_gap, action_y))?;
        self.reparse_button.set_size(Size::new(action_width, action_height))?;
        
        let result_title_y = action_y + action_height + panel_spacing;
        self.result_title.set_loc(Point::new(right_x, result_title_y))?;
        self.result_title.set_size(Size::new(right_width, result_title_height))?;
        
        self.result_text.set_loc(Point::new(right_x, result_title_y + result_title_height + panel_spacing))?;
        self.result_text.set_size(Size::new(right_width, content_height - (result_title_y - content_y) - result_title_height - panel_spacing))?;

        Ok(())
    }
}

extern "system" fn main_window_subclass_proc(
    hwnd: HWND,
    umsg: u32,
    wparam: WPARAM,
    lparam: LPARAM,
    _uidsubclass: usize,
    dwrefdata: usize,
) -> LRESULT {
    if dwrefdata == 0 {
        return unsafe { DefSubclassProc(hwnd, umsg, wparam, lparam) };
    }
    let sender = unsafe { &*(dwrefdata as *const ComponentSender<MainModel>) };
    match umsg {
        WM_DROPFILES => {
            let hdrop = HDROP(wparam.0 as _);
            if let Some(path) = extract_first_path_from_hdrop(hdrop) {
                sender.post(Message::ImportPath(path));
            }
            unsafe { DragFinish(hdrop) };
            LRESULT(0)
        }
        WM_KEYDOWN => {
            if wparam.0 as u32 == VK_V.0 as u32 {
                let ctrl_down = unsafe { GetKeyState(VK_CONTROL.0 as i32) } < 0;
                if ctrl_down {
                    if let Some(path) = extract_first_path_from_clipboard() {
                        sender.post(Message::ImportPath(path));
                        return LRESULT(0);
                    }
                }
            }
            unsafe { DefSubclassProc(hwnd, umsg, wparam, lparam) }
        }
        WM_PASTE => {
            if let Some(path) = extract_first_path_from_clipboard() {
                sender.post(Message::ImportPath(path));
                return LRESULT(0);
            }
            unsafe { DefSubclassProc(hwnd, umsg, wparam, lparam) }
        }
        WM_NCDESTROY => {
            unsafe {
                let _ = RemoveWindowSubclass(hwnd, Some(main_window_subclass_proc), 1);
                drop(Box::from_raw(dwrefdata as *mut ComponentSender<MainModel>));
                DefSubclassProc(hwnd, umsg, wparam, lparam)
            }
        }
        _ => unsafe { DefSubclassProc(hwnd, umsg, wparam, lparam) },
    }
}

fn enable_paste_and_drag_hooks(window: &Window, sender: ComponentSender<MainModel>) -> Result<()> {
    let hwnd = HWND(window.as_window().handle()?);
    unsafe {
        DragAcceptFiles(hwnd, true);
        let sender_ptr = Box::into_raw(Box::new(sender)) as usize;
        let ok = SetWindowSubclass(hwnd, Some(main_window_subclass_proc), 1, sender_ptr).as_bool();
        if !ok {
            drop(Box::from_raw(sender_ptr as *mut ComponentSender<MainModel>));
            return Err(winio::Error::from_thread());
        }
    }
    Ok(())
}

fn extract_first_path_from_hdrop(hdrop: HDROP) -> Option<PathBuf> {
    let count = unsafe { DragQueryFileW(hdrop, u32::MAX, None) };
    if count == 0 {
        return None;
    }
    let len = unsafe { DragQueryFileW(hdrop, 0, None) };
    if len == 0 {
        return None;
    }
    let mut buffer = vec![0u16; len as usize + 1];
    let copied = unsafe { DragQueryFileW(hdrop, 0, Some(buffer.as_mut_slice())) };
    if copied == 0 {
        return None;
    }
    let os_string = OsString::from_wide(&buffer[..copied as usize]);
    Some(PathBuf::from(os_string))
}

fn extract_first_path_from_clipboard() -> Option<PathBuf> {
    const CF_HDROP_FORMAT: u32 = 15;
    if unsafe { IsClipboardFormatAvailable(CF_HDROP_FORMAT).is_err() } {
        return None;
    }
    if unsafe { OpenClipboard(None).is_err() } {
        return None;
    }
    let handle = match unsafe { GetClipboardData(CF_HDROP_FORMAT) } {
        Ok(value) => value,
        Err(_) => {
            let _ = unsafe { CloseClipboard() };
            return None;
        }
    };
    if handle.is_invalid() {
        let _ = unsafe { CloseClipboard() };
        return None;
    }
    let hdrop = HDROP(handle.0);
    let path = extract_first_path_from_hdrop(hdrop);
    let _ = unsafe { CloseClipboard() };
    path
}

fn apply_glyph_icon_to_button(button: &Button, glyph_hex: &str, text: &str) -> windows_core::Result<()> {
    let xaml = format!(
        "<StackPanel xmlns='http://schemas.microsoft.com/winfx/2006/xaml/presentation' Orientation='Vertical' Spacing='12' HorizontalAlignment='Center' VerticalAlignment='Center'><TextBlock FontFamily='Segoe Fluent Icons' FontSize='48' Text='&#x{glyph_hex};' HorizontalAlignment='Center'/><TextBlock Text='{text}' FontSize='16' HorizontalAlignment='Center'/></StackPanel>"
    );
    let content = XamlReader::Load(&HSTRING::from(xaml))?;
    let native_button = button.as_widget().as_winui().cast::<MUXC::Button>()?;
    native_button.SetContent(&content)?;
    Ok(())
}

fn apply_compact_glyph_button(button: &Button, glyph_hex: &str, text: &str) -> windows_core::Result<()> {
    let xaml = format!(
        "<StackPanel xmlns='http://schemas.microsoft.com/winfx/2006/xaml/presentation' Orientation='Horizontal' Spacing='8' HorizontalAlignment='Center' VerticalAlignment='Center'><TextBlock FontFamily='Segoe Fluent Icons' FontSize='14' Text='&#x{glyph_hex};' VerticalAlignment='Center'/><TextBlock Text='{text}' FontSize='13' VerticalAlignment='Center'/></StackPanel>"
    );
    let content = XamlReader::Load(&HSTRING::from(xaml))?;
    let native_button = button.as_widget().as_winui().cast::<MUXC::Button>()?;
    native_button.SetContent(&content)?;
    Ok(())
}

fn apply_label_font_size(label: &Label, size: f64) -> windows_core::Result<()> {
    let native_label = label.as_widget().as_winui().cast::<MUXC::TextBlock>()?;
    native_label.SetFontSize(size)?;
    Ok(())
}

fn apply_textbox_font_size(text_box: &TextBox, size: f64) -> windows_core::Result<()> {
    let native_text_box = text_box.as_widget().as_winui().cast::<MUXC::TextBox>()?;
    native_text_box.SetFontSize(size)?;
    Ok(())
}

fn apply_image_to_button(button: &Button, image_path: &str) -> windows_core::Result<()> {
    let path = image_path.replace("\\", "/");
    let xaml = format!(
        "<Grid xmlns='http://schemas.microsoft.com/winfx/2006/xaml/presentation' Background='Transparent'>
            <Image Source='file:///{}' Stretch='Uniform' HorizontalAlignment='Center' VerticalAlignment='Center' />
        </Grid>",
        path
    );
    let content = XamlReader::Load(&HSTRING::from(xaml))?;
    let native_button = button.as_widget().as_winui().cast::<MUXC::Button>()?;
    native_button.SetContent(&content)?;
    Ok(())
}

async fn process_image(
    upload_button: &Button,
    result_text: &mut TextBox,
    current_image_path: &mut Option<PathBuf>,
    path: &PathBuf,
) -> Result<()> {
    *current_image_path = Some(path.clone());
    if let Some(path_str) = path.to_str() {
        let _ = apply_image_to_button(upload_button, path_str);
        result_text.set_text("正在解密...")?;
        let extracted = dct_extract(path_str).await;
        if let Some(text) = extracted {
            let display_text = render_watermark_text(&text);
            result_text.set_text(display_text)?;
        } else {
            result_text.set_text("解密失败或未能识别图片格式")?;
        }
    } else {
        result_text.set_text("文件路径无效")?;
    }
    Ok(())
}

async fn decode_image(path: &str) -> Option<(Vec<u8>, usize, usize)> {
    use windows::Storage::{StorageFile, FileAccessMode};
    use windows::Graphics::Imaging::{BitmapDecoder, BitmapPixelFormat, BitmapAlphaMode};
    use windows::Storage::Streams::{Buffer, DataReader};

    let file = StorageFile::GetFileFromPathAsync(&HSTRING::from(path)).ok()?.await.ok()?;
    let stream = file.OpenAsync(FileAccessMode::Read).ok()?.await.ok()?;
    let decoder = BitmapDecoder::CreateAsync(&stream).ok()?.await.ok()?;
    
    // Request RGBA8 to keep the same layout as wasm-side encoding/embedding
    let bitmap = decoder.GetSoftwareBitmapConvertedAsync(BitmapPixelFormat::Rgba8, BitmapAlphaMode::Straight).ok()?.await.ok()?;
    
    let width = bitmap.PixelWidth().ok()? as usize;
    let height = bitmap.PixelHeight().ok()? as usize;
    let capacity = (width * height * 4) as u32;
    
    let buffer = Buffer::Create(capacity).ok()?;
    bitmap.CopyToBuffer(&buffer).ok()?;
    
    let reader = DataReader::FromBuffer(&buffer).ok()?;
    let mut bytes = vec![0u8; capacity as usize];
    reader.ReadBytes(&mut bytes).ok()?;
    
    Some((bytes, width, height))
}

async fn dct_extract(img_path: &str) -> Option<String> {
    let (bytes, width, height) = decode_image(img_path).await?;
    dct_extract_from_rgba(&bytes, width, height)
}

fn render_watermark_text(extracted_text: &str) -> String {
    let json_start = extracted_text.find('{');
    let json_end = extracted_text.rfind('}');
    let Some(start) = json_start else {
        return extracted_text.to_string();
    };
    let Some(end) = json_end else {
        return extracted_text.to_string();
    };
    if end < start {
        return extracted_text.to_string();
    }
    let json_text = &extracted_text[start..=end];
    let Ok(value) = serde_json::from_str::<Value>(json_text) else {
        return extracted_text.to_string();
    };
    let timestamp = value.get("ts").and_then(Value::as_i64).unwrap_or(0);
    let formatted_timestamp = format_timestamp(timestamp);
    let plugin_version = value.get("pv").and_then(Value::as_str).unwrap_or("未知");
    let account = value
        .get("account")
        .or_else(|| value.get("user_id"))
        .and_then(|it| it.as_str().map(ToOwned::to_owned).or_else(|| it.as_i64().map(|num| num.to_string())))
        .unwrap_or_else(|| "未知".to_string());
    let emphasized_timestamp = emphasize_value(&formatted_timestamp);
    let emphasized_plugin_version = emphasize_value(plugin_version);
    let emphasized_account = emphasize_value(&account);
    format!(
        "【原始水印】\n{}\n\n【解析结果】\n  时间戳：{}\n  插件版本：{}\n  账号：{}",
        extracted_text,
        emphasized_timestamp,
        emphasized_plugin_version,
        emphasized_account
    )
}

fn format_timestamp(timestamp_ms: i64) -> String {
    if timestamp_ms <= 0 {
        return "未知".to_string();
    }
    match Local.timestamp_millis_opt(timestamp_ms).single() {
        Some(value) => value.format("%Y-%m-%d %H:%M:%S").to_string(),
        None => "未知".to_string()
    }
}

fn emphasize_value(value: &str) -> String {
    value
        .chars()
        .map(|ch| {
            let code = ch as u32;
            let mapped = if ch.is_ascii_digit() {
                char::from_u32(0x1D7EC + (code - '0' as u32))
            } else if ch.is_ascii_uppercase() {
                char::from_u32(0x1D5D4 + (code - 'A' as u32))
            } else if ch.is_ascii_lowercase() {
                char::from_u32(0x1D5EE + (code - 'a' as u32))
            } else {
                None
            };
            mapped.unwrap_or(ch)
        })
        .collect::<String>()
}
