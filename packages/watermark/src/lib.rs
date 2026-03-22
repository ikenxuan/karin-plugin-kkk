pub mod algorithm;

use image::ImageEncoder;
use napi::bindgen_prelude::{Buffer, Error, Result};
use napi_derive::napi;

#[napi]
pub fn extract_watermark_from_png_bytes(png_bytes: Buffer) -> Result<String> {
    let image = image::load_from_memory_with_format(png_bytes.as_ref(), image::ImageFormat::Png)
        .map_err(|e| Error::from_reason(format!("PNG decode failed: {e}")))?;
    let rgba = image.to_rgba8();
    let width = rgba.width() as usize;
    let height = rgba.height() as usize;
    let extracted = algorithm::dct_extract_from_rgba(rgba.as_raw(), width, height)
        .unwrap_or_else(|| "未检测到文本或解析失败".to_string());
    Ok(extracted)
}

#[napi]
pub fn embed_watermark_to_png_bytes(
    png_bytes: Buffer,
    watermark_text: String,
) -> Result<Buffer> {
    let image = image::load_from_memory_with_format(png_bytes.as_ref(), image::ImageFormat::Png)
        .map_err(|e| Error::from_reason(format!("PNG decode failed: {e}")))?;
    let rgba = image.to_rgba8();
    let width = rgba.width() as usize;
    let height = rgba.height() as usize;
    let embedded = algorithm::dct_embed_to_rgba(rgba.as_raw(), width, height, &watermark_text)
        .ok_or_else(|| Error::from_reason("Embed failed"))?;

    let mut out = Vec::new();
    image::codecs::png::PngEncoder::new(&mut out)
        .write_image(
            &embedded,
            width as u32,
            height as u32,
            image::ExtendedColorType::Rgba8,
        )
        .map_err(|e| Error::from_reason(format!("PNG encode failed: {e}")))?;
    Ok(Buffer::from(out))
}
