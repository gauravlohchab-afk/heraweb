import { useRef, useState } from 'react';
import Icon from './Icon.jsx';

/**
 * Click-to-play video. Shows a lightweight poster until the visitor presses
 * play, then swaps in a native <video> with controls, keeping the original
 * aspect ratio. Nothing is downloaded before that click.
 */
export default function VideoPlayer({ video, label, caption, small = false, className = '' }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);
  const ratio = `${video.width} / ${video.height}`;

  if (playing) {
    return (
      <div className={`video-frame ${className}`} style={{ '--ratio': ratio }}>
        <video ref={ref} src={video.src} poster={video.poster} controls autoPlay playsInline preload="auto" aria-label={label}>
          Your browser can’t play this video. <a href={video.src}>Download it instead</a>.
        </video>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`video-poster${small ? ' video-poster--sm' : ''} ${className}`}
      style={{ '--ratio': ratio }}
      onClick={() => setPlaying(true)}
    >
      <span className="visually-hidden">Play video: {label}. </span>
      <img
        src={video.poster}
        srcSet={video.posterSmall ? `${video.posterSmall} 640w, ${video.poster} ${video.width}w` : undefined}
        sizes={video.posterSmall ? '(min-width: 900px) 55vw, 100vw' : undefined}
        width={video.width}
        height={video.height}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className="video-poster__play" aria-hidden="true">
        <Icon name="play" />
      </span>
      {caption && <span className="video-poster__meta">{caption}</span>}
    </button>
  );
}
