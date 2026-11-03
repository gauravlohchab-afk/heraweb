import { useId, useState } from 'react';
import { Placeholder } from '../ui/Media.jsx';
import Icon from '../ui/Icon.jsx';

function Layer({ image, alt, label }) {
  return image ? (
    <img src={image.src} srcSet={image.srcSet} sizes="(min-width: 900px) 30vw, 90vw" width={image.width} height={image.height} alt={alt} loading="lazy" decoding="async" />
  ) : (
    <Placeholder label={label} />
  );
}

/**
 * Drag-to-compare slider. A native range input drives the split, so it works
 * with mouse, touch and keyboard (arrow keys) and announces its value.
 */
export default function BeforeAfterSlider({ before, after, title, ratio = '4 / 5' }) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className="ba" style={{ '--pos': `${pos}%`, '--ratio': ratio }}>
      <div className="ba__layer">
        <Layer image={before} alt={`${title} — before treatment`} label="" />
      </div>
      <div className="ba__layer ba__layer--after">
        <Layer image={after} alt={`${title} — after treatment`} label="" />
      </div>
      <span className="ba__label ba__label--before">Before</span>
      <span className="ba__label ba__label--after">After</span>
      <label htmlFor={id} className="visually-hidden">
        Compare before and after for {title}
      </label>
      <input
        id={id}
        className="ba__range"
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% before, ${100 - pos}% after`}
      />
      <div className="ba__handle" aria-hidden="true">
        <span className="ba__knob">
          <Icon name="compare" />
        </span>
      </div>
    </div>
  );
}
