import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Hydrate only when the prerendered markup belongs to this URL (a host may serve
// index.html as a fallback for unknown paths); otherwise render fresh.
const normalize = (p) => (p.endsWith('/') ? p : `${p}/`);
if (root.dataset.path && normalize(root.dataset.path) === normalize(location.pathname)) {
  hydrateRoot(root, app);
} else {
  root.textContent = '';
  createRoot(root).render(app);
}
