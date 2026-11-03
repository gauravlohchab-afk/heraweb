import { site } from '../../data/site.js';
import Icon from './Icon.jsx';

const items = [
  ['facebook', 'Facebook', site.social.facebook],
  ['instagram', 'Instagram', site.social.instagram],
  ['tiktok', 'TikTok', site.social.tiktok],
];

export default function Socials({ invert = false }) {
  return (
    <ul className={`socials${invert ? ' socials--invert' : ''}`}>
      {items.map(([icon, label, href]) => (
        <li key={icon}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Hera Wellness Studio on ${label}`}>
            <Icon name={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
