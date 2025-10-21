import libheif from 'libheif-js/wasm-bundle';

self.onmessage = async (event) => {
  const { id, url, output = { type: 'image/jpeg', quality: 0.9 } } = event.data || {};
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
    const buf = await res.arrayBuffer();

    const decoder = new libheif.HeifDecoder();
    const images = decoder.decode(buf);
    if (!images || !images.length) throw new Error('no images in HEIF');

    const image = images[0];
    const width = image.get_width();
    const height = image.get_height();

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);

    // 将 RGBA 数据填充到 ImageData
    await new Promise((resolve, reject) => {
      image.display(imageData, (displayData) => {
        if (!displayData) return reject(new Error('HEIF processing error'));
        resolve();
      });
    });

    ctx.putImageData(imageData, 0, 0);

    // 导出为 JPEG（可改为 PNG）
    const blob = await canvas.convertToBlob({ type: output.type, quality: output.quality });
    self.postMessage({ id, blob });
  } catch (err) {
    self.postMessage({ id, error: err?.message || String(err) });
  }
};