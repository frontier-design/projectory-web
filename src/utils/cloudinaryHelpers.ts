export function optimizeCloudinaryUrl(
  original: string,
  transformations = 'f_auto,q_auto'
): string {
  if (!original || !original.includes('res.cloudinary.com')) return original;

  // Split requested transformations and filter out ones already in the URL
  const newParams = transformations.split(',').filter(t => !original.includes(t));
  if (newParams.length === 0) return original;

  const afterUpload = original.indexOf('/upload/') + '/upload/'.length;
  const hasExistingTransforms = !/^v\d/.test(original.slice(afterUpload));

  if (hasExistingTransforms) {
    // Append new params to existing transform chain
    const nextSlash = original.indexOf('/', afterUpload);
    return original.slice(0, nextSlash) + ',' + newParams.join(',') + original.slice(nextSlash);
  }

  return original.replace('/upload/', `/upload/${newParams.join(',')}/`);
}

export function getCloudinaryFallbackUrls(original: string): string[] {
  if (!original || !original.includes('res.cloudinary.com')) return [original];

  const candidates = new Set<string>([original]);
  const withoutVersion = original.replace(/\/v\d+(?=\/)/, '');
  candidates.add(withoutVersion);

  const stripExt = (url: string) => url.replace(/\.(webp|jpg|jpeg|png|gif|avif|heic|tiff|bmp)(?=([?#].*)?$)/i, '');
  candidates.add(stripExt(original));
  candidates.add(stripExt(withoutVersion));

  return Array.from(candidates).filter(Boolean);
}
