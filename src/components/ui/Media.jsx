import { useEffect, useRef, useState } from 'react';
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
 * Silent looping video layered over a Media image. The image underneath is the
 * fallback: this removes itself if the video can't load or autoplay is refused,
 * and for visitors who prefer reduced motion. Plays only while on screen.
 */
function LoopVideo({ video, eager }) {
  const ref = useRef(null);
  const [off, setOff] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    // NETWORK_NO_SOURCE: every source had already failed before hydration.
    if (el.networkState === 3 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOff(true);
      return undefined;
    }
    el.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.pause();
          return;
        }
        el.play().catch((err) => {
          if (err.name === 'NotAllowedError') setOff(true);
        });
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (off) return null;

  return (
    <video ref={ref} className="media__video" poster={video.poster} autoPlay={eager} preload={eager ? 'auto' : 'none'} muted loop playsInline disablePictureInPicture aria-hidden="true" tabIndex={-1}>
      {video.srcSmall && <source src={video.srcSmall} type="video/mp4" media="(max-width: 767px)" />}
      <source src={video.src} type="video/mp4" onError={() => setOff(true)} />
    </video>
  );
}

/**
 * Responsive image inside an aspect-ratio frame. Falls back to a branded
 * placeholder when `image` is missing, so layouts never break while assets
 * are still being supplied. Pass `video` to play a silent loop over the image.
 */
export default function Media({
  image,
  video,
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
      {video && <LoopVideo video={video} eager={priority} />}
    </div>
  );
}
