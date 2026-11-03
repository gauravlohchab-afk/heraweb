import { useEffect, useRef, useState } from 'react';
import { site } from '../../data/site.js';
import Icon from '../ui/Icon.jsx';
import BookingPanel from './BookingPanel.jsx';

const CLOSE_MS = 220;

/**
 * The shared booking popup. Native <dialog> gives focus trapping, Escape and
 * focus return; we add scroll locking, backdrop-click and an exit animation.
 */
export default function BookingModal({ isOpen, treatment, mode, onClose }) {
  const ref = useRef(null);
  const [closing, setClosing] = useState(false);
  const [session, setSession] = useState(0); // fresh form state per opening

  useEffect(() => {
    const dialog = ref.current;
    if (isOpen && !dialog.open) {
      setSession((s) => s + 1);
      setClosing(false);
      dialog.showModal();
      document.body.classList.add('is-locked');
    }
    if (!isOpen && dialog.open) {
      setClosing(true);
      const t = setTimeout(() => {
        dialog.close();
        setClosing(false);
        document.body.classList.remove('is-locked');
      }, CLOSE_MS);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => () => document.body.classList.remove('is-locked'), []);

  return (
    <dialog
      ref={ref}
      className={`booking-modal${closing ? ' is-closing' : ''}`}
      aria-labelledby="booking-modal-title"
      onCancel={(e) => {
        e.preventDefault(); // run our exit animation instead of an instant close
        onClose();
      }}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="booking-modal__inner">
        <header className="booking-modal__head">
          <div>
            <h2 className="h3" id="booking-modal-title">
              Book your <em>treatment</em>
            </h2>
            <p className="text-soft">Request a consultation call or book a time at our studio in {site.location.locality}.</p>
          </div>
          <button type="button" className="booking-modal__close" onClick={onClose} aria-label="Close booking form">
            <Icon name="close" />
          </button>
        </header>
        {session > 0 && <BookingPanel key={session} treatment={treatment} mode={mode} titleId="booking-modal-title" compact />}
      </div>
    </dialog>
  );
}
