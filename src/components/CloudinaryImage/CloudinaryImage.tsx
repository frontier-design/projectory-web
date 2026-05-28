import React, { useEffect, useMemo, useState } from 'react';
import { getCloudinaryFallbackUrls } from '../../utils/cloudinaryHelpers';

type CloudinaryImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ src, onError, ...imgProps }) => {
  const fallbackUrls = useMemo(() => getCloudinaryFallbackUrls(src), [src]);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  useEffect(() => {
    setFallbackIndex(0);
  }, [src]);

  const activeSrc = fallbackUrls[fallbackIndex] ?? src;

  return (
    <img
      {...imgProps}
      src={activeSrc}
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
