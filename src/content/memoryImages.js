// Deduplica antes de limitar, preservando a primeira ocorrência e a ordem editorial.
// Um id opcional identifica a mesma fotografia publicada em URLs diferentes.
export function getMemoryImages(images = []) {
  const sources = new Set();
  const ids = new Set();
  const result = [];
  if (!Array.isArray(images)) return result;
  for (const image of images) {
    if (!image || typeof image.src !== 'string') continue;
    let url;
    try { url = new URL(image.src.trim()); } catch { continue; }
    if (!['https:', 'http:'].includes(url.protocol)) continue;
    url.hash = '';
    url.searchParams.sort();
    const source = url.href;
    if (sources.has(source) || (image.id && ids.has(image.id))) continue;
    sources.add(source);
    if (image.id) ids.add(image.id);
    result.push({ ...image, src: image.src.trim() });
    if (result.length === 5) break;
  }
  return result;
}
