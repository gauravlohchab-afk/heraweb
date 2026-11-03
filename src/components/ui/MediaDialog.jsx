import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

/**
 * Full-screen viewer for a list of images/videos. Uses the native <dialog>
 * (focus trapping, Escape to close, focus returns to the opener). Arrow keys
 * move between items.
 */
export default function MediaDialog({ items, index, onChange, onClose, title }) {
  const ref = useRef(null);
  const open = index !== null && index !== undefined;
  const item = open ? items[index] : null;
  const many = items.length > 1;

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const step = (d) => onChange((index + d + items.length) % items.length);

  const onKeyDown = (e) => {
    if (!many) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-label={title}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {item && (
        <>
          <div className="dialog__bar">
            <span aria-live="polite">
              {title}
              {many && ` · ${index + 1} / ${items.length}`}
            </span>
            <div className="dialog__nav">
              {many && (
                <>
                  <button type="button" className="dialog__btn" onClick={() => step(-1)} aria-label="Previous">
                    <Icon name="arrow-left" />
                  </button>
                  <button type="button" className="dialog__btn" onClick={() => step(1)} aria-label="Next">
                    <Icon name="arrow" />
                  </button>
                </>
              )}
              <button type="button" className="dialog__btn" onClick={onClose} aria-label="Close" autoFocus>
                <Icon name="close" />
              </button>
            </div>
          </div>
          <div className="dialog__body">
            {item.type === 'video' ? (
              <video key={item.src} src={item.src} poster={item.poster} controls autoPlay playsInline aria-label={item.title} />
            ) : (
              <img key={item.src} src={item.src} width={item.width} height={item.height} alt={item.alt ?? title} />
            )}
          </div>
        </>
      )}
    </dialog>
  );
}
