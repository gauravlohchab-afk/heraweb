import { Link } from 'react-router';
import BookButton from '../ui/BookButton.jsx';

// Fixed bottom actions on small screens: treatments and booking always one tap away.
export default function MobileBar() {
  return (
    <div className="mobile-bar">
      <Link to="/treatments/" className="btn btn--ghost">Treatments</Link>
      <BookButton variant="dark">Book now</BookButton>
    </div>
  );
}
