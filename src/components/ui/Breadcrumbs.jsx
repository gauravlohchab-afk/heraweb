import { Link } from 'react-router';

// items: [[label, path], ...] — the last item is the current page.
export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map(([label, path], i) => (
          <li key={path}>
            {i === items.length - 1 ? <span aria-current="page">{label}</span> : <Link to={path}>{label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
