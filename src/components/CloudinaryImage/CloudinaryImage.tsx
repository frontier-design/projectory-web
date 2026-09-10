import React, { useEffect, useMemo, useState } from 'react';
import { getCloudinaryFallbackUrls, optimizeCloudinaryUrl } from '@/utils/cloudinaryHelpers';

type CloudinaryImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  /**
   * Rendered widths in px to offer as a srcset, e.g. `[480, 800]`. Cloudinary
   * resizes on its side, so the browser downloads a candidate that matches the
   * box instead of the full-resolution original. Pair with `sizes`.
   */
  widths?: number[];
};

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ src, widths, onError, ...imgProps }) => {
  const fallbackUrls = useMemo(() => getCloudinaryFallbackUrls(src), [src]);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  useEffect(() => {
    setFallbackIndex(0);
  }, [src]);

  const activeSrc = fallbackUrls[fallbackIndex] ?? src;

  // Only the first URL is transform-able; the fallbacks exist because that URL
  // 404'd, so retries go out untouched rather than compounding the failure.
  const isPrimary = fallbackIndex === 0;

  const srcSet = useMemo(() => {
    if (!widths?.length || !isPrimary) return undefined;
    return widths
      .map((w) => `${optimizeCloudinaryUrl(activeSrc, `f_auto,q_auto,w_${w}`)} ${w}w`)
      .join(', ');
  }, [widths, isPrimary, activeSrc]);

  // Prefer a real srcset candidate so HTML preloads and browser cache hit the same URL.
  const resolvedSrc =
    widths?.length && isPrimary
      ? optimizeCloudinaryUrl(activeSrc, `f_auto,q_auto,w_${widths[Math.min(1, widths.length - 1)]}`)
      : activeSrc;

  return (
    <img
      {...imgProps}
      src={resolvedSrc}
      srcSet={srcSet}
      onError={(event) => {
        const nextIndex = fallbackIndex + 1;
        if (nextIndex < fallbackUrls.length) {
          setFallbackIndex(nextIndex);
          return;
        }
        onError?.(event);
      }}
    />
  );
};

export default CloudinaryImage;
