import { brand } from '../../data/media.js';

export function Placeholder({ label = '', ratio, className = '' }) {
  return (
    <div
      className={`placeholder ${className}`}
      style={ratio ? { '--ratio': ratio } : undefined}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
    >
      <img
        className="placeholder__mark"
        src={brand.emblem.src}
        width={brand.emblem.width}
        height={brand.emblem.height}
        alt=""
        loading="lazy"
        decoding="async"
      />
      {label && <span className="placeholder__label">{label}</span>}
    </div>
  );
}

/**
 * Responsive image inside an aspect-ratio frame. Falls back to a branded
 * placeholder when `image` is missing, so layouts never break while assets
 * are still being supplied.
 */
export default function Media({
  image,
  alt,
  ratio,
  sizes = '100vw',
  priority = false,
  fit,
  position,
  arch = false,
  className = '',
  placeholderLabel,
  style: extraStyle,
  ...rest
}) {
  const style = {
    ...extraStyle,
    ...(ratio && { '--ratio': ratio }),
    ...(fit && { '--fit': fit }),
    ...(position && { '--pos': position }),
  };

  return (
    <div className={`media${arch ? ' media--arch' : ''} ${className}`} style={style} {...rest}>
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.srcSet ? sizes : undefined}
          width={image.width}
          height={image.height}
          alt={alt ?? image.alt ?? ''}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding={priority ? 'sync' : 'async'}
        />
      ) : (
        <Placeholder label={placeholderLabel} ratio={ratio} />
      )}
    </div>
  );
}
