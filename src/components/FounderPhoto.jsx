import React from 'react';
import { assetUrl } from '../config/site';
import { founder } from '../data/aboutData';

// Founder portrait (WebP with JPEG fallback), or an initials monogram when no photo is set.
export default function FounderPhoto({ className = '', size = 320, alt = `Portrait of ${founder.name}`, eager = false }) {
  if (!founder.photo) {
    return <div className={`${className} founder-monogram`} aria-hidden="true">{founder.initials}</div>;
  }

  return (
    <picture>
      <source srcSet={assetUrl(founder.photo.webp)} type="image/webp" />
      <img
        src={assetUrl(founder.photo.jpg)}
        alt={alt}
        className={className}
        width={size}
        height={size}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
}
