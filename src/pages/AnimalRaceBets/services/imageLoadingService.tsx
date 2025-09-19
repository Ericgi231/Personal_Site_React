const imageCache = new Map<string, HTMLImageElement>();

export async function getCachedImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = reject;
  });
}