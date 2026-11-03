import { useState } from 'react';
import { center, studioVideo } from '../../data/media.js';
import Media from '../ui/Media.jsx';
import Icon from '../ui/Icon.jsx';
import MediaDialog from '../ui/MediaDialog.jsx';
import VideoPlayer from '../ui/VideoPlayer.jsx';

const photos = [center.corridor, center.room, center.bed, center.doors, center.stairs, center.entrance];

// Editorial mosaic of the real studio, with a full-screen viewer and the walk-through video.
export default function StudioGallery() {
  const [viewer, setViewer] = useState(null);

  return (
    <div className="studio-gallery">
      {studioVideo && (
        <figure className="studio-gallery__video reveal">
          <VideoPlayer video={studioVideo} label={studioVideo.title} caption={<span><strong>Find your way to Hera</strong>A walk to the studio · 0:40</span>} />
        </figure>
      )}
      {photos.map((p, i) => (
        <button
          key={p.src}
          type="button"
          className={`studio-gallery__item studio-gallery__item--${i + 1} hover-zoom reveal-img`}
          style={{ '--d': i % 3 }}
          onClick={() => setViewer(i)}
          aria-label={`View photo: ${p.alt}`}
        >
          <Media image={p} sizes="(min-width: 900px) 30vw, 50vw" />
          <span className="gallery__expand" aria-hidden="true">
            <Icon name="expand" />
          </span>
        </button>
      ))}
      <MediaDialog items={photos} index={viewer} onChange={setViewer} onClose={() => setViewer(null)} title="Hera Wellness Studio" />
    </div>
  );
}
