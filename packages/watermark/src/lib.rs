pub mod algorithm;

#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
use image::ImageEncoder;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn extract_watermark_from_png_bytes(png_bytes: &[u8]) -> Result<String, JsValue> {
    let image = image::load_from_memory_with_format(png_bytes, image::ImageFormat::Png)
        .map_err(|e| JsValue::from_str(&format!("PNG decode failed: {e}")))?;
    let rgba = image.to_rgba8();
    let width = rgba.width() as usize;
    let height = rgba.height() as usize;
    let extracted = algorithm::dct_extract_from_rgba(rgba.as_raw(), width, height)
        .unwrap_or_else(|| "未检测到文本或解析失败".to_string());
    Ok(extracted)
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn embed_watermark_to_png_bytes(
    png_bytes: &[u8],
    watermark_text: &str,
) -> Result<Vec<u8>, JsValue> {
    let image = image::load_from_memory_with_format(png_bytes, image::ImageFormat::Png)
        .map_err(|e| JsValue::from_str(&format!("PNG decode failed: {e}")))?;
    let rgba = image.to_rgba8();
    let width = rgba.width() as usize;
    let height = rgba.height() as usize;
    let embedded = algorithm::dct_embed_to_rgba(rgba.as_raw(), width, height, watermark_text)
        .ok_or_else(|| JsValue::from_str("Embed failed"))?;

    let mut out = Vec::new();
    image::codecs::png::PngEncoder::new(&mut out)
        .write_image(
            &embedded,
            width as u32,
            height as u32,
            image::ExtendedColorType::Rgba8,
        )
        .map_err(|e| JsValue::from_str(&format!("PNG encode failed: {e}")))?;
    Ok(out)
}
