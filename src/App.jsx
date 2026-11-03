import { Route, Routes } from 'react-router';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import TreatmentsPage from './pages/TreatmentsPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import TreatmentPage from './pages/TreatmentPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import SitemapPage from './pages/SitemapPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './styles/index.css';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="treatments" element={<TreatmentsPage />} />
        <Route path="treatments/:category" element={<CategoryPage />} />
        <Route path="treatments/:category/:treatment" element={<TreatmentPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="sitemap" element={<SitemapPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
