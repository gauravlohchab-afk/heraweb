import { Link } from 'react-router';
import Icon from '../components/ui/Icon.jsx';

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className="container not-found">
        <p className="eyebrow">Page not found</p>
        <h1 className="h1">
          This page has <em>moved on.</em>
        </h1>
        <p className="lede text-soft">The page you’re looking for doesn’t exist. Explore our treatments instead.</p>
        <div className="cluster btn-row">
          <Link to="/treatments/" className="btn">
            View treatments <Icon name="arrow" />
          </Link>
          <Link to="/" className="btn btn--ghost">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
