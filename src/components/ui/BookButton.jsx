import { useBooking } from '../booking/BookingContext.jsx';
import Icon from './Icon.jsx';

/**
 * Every booking CTA on the site. Opens the shared booking popup, with the
 * treatment preselected when one is given. mode: 'booking' | 'call'.
 */
export default function BookButton({ children = 'Book now', treatment, mode = 'booking', variant = '', size = '', className = '', icon }) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      className={`btn ${variant && `btn--${variant}`} ${size && `btn--${size}`} ${className}`}
      onClick={() => open({ treatment, mode })}
      aria-haspopup="dialog"
    >
      <Icon name={icon ?? (mode === 'call' ? 'phone' : 'book')} />
      {children}
    </button>
  );
}
