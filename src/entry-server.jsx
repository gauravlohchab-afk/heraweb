import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { getPageMeta, renderHead } from './data/seo.js';
import { staticRoutes } from './routes.js';

export { staticRoutes, getPageMeta };

export function render(url) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, head: renderHead(getPageMeta(url)) };
}
