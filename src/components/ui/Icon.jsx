import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronsLeftRight,
  CircleAlert,
  CircleCheck,
  Clock,
  CreditCard,
  ExternalLink,
  Layers,
  Leaf,
  LoaderCircle,
  Mail,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  Play,
  Quote,
  UserRound,
  X,
} from 'lucide-react';

// One icon system: Lucide line icons (consistent 1.5 stroke) for UI, plus
// simple filled marks for social brands, which Lucide does not ship.
const lucide = {
  arrow: ArrowRight,
  'arrow-left': ArrowLeft,
  award: Award,
  book: CalendarCheck,
  calendar: CalendarDays,
  card: CreditCard,
  chat: MessageCircle,
  check: Check,
  'check-circle': CircleCheck,
  chevron: ChevronDown,
  clock: Clock,
  close: X,
  compare: ChevronsLeftRight,
  alert: CircleAlert,
  expand: Maximize2,
  external: ExternalLink,
  layers: Layers,
  leaf: Leaf,
  loader: LoaderCircle,
  mail: Mail,
  phone: Phone,
  pin: MapPin,
  play: Play,
  quote: Quote,
  user: UserRound,
};

const brands = {
  facebook: <path d="M13.5 21v-7.5H16l.4-3H13.5V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />,
  instagram: (
    <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM20 8.2c-.1-1.5-.4-2.8-1.5-3.8S16.2 3 14.7 3c-1.5-.1-6 0-7.4 0-1.5.1-2.8.4-3.8 1.4S2.1 6.7 2 8.2c-.1 1.5-.1 6 0 7.5.1 1.5.4 2.8 1.5 3.8s2.3 1.3 3.8 1.4c1.5.1 6 .1 7.4 0 1.5-.1 2.8-.4 3.8-1.4s1.4-2.3 1.5-3.8c.1-1.5.1-6 0-7.5Zm-1.9 9.2a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.4s-.1-4.1.4-5.3a3 3 0 0 1 1.7-1.7c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.3s.1 4.2-.4 5.4Z" />
  ),
  tiktok: <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5V9.8a5.7 5.7 0 1 0 4.9 5.6V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4s-1.9.1-3.2-1.6Z" />,
  messenger: (
    <path d="M12 2.5C6.6 2.5 2.5 6.4 2.5 11.6c0 2.7 1.1 5.1 3 6.7.2.1.3.4.3.6l.1 1.7c0 .5.6.9 1.1.7l1.9-.8c.2-.1.4-.1.6 0 .8.2 1.7.3 2.5.3 5.4 0 9.5-3.9 9.5-9.2S17.4 2.5 12 2.5Zm5.7 7.1-2.8 4.4c-.4.7-1.4.9-2.1.4l-2.2-1.7c-.2-.2-.5-.2-.7 0l-3 2.3c-.4.3-.9-.2-.6-.6l2.8-4.4c.4-.7 1.4-.9 2.1-.4l2.2 1.7c.2.2.5.2.7 0l3-2.3c.4-.3.9.2.6.6Z" />
  ),
};

export default function Icon({ name, className = '', title }) {
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': 'true' };
  const brand = brands[name];
  if (brand) {
    return (
      <svg className={`icon icon--brand ${className}`} viewBox="0 0 24 24" focusable="false" {...a11y}>
        {brand}
      </svg>
    );
  }
  const Glyph = lucide[name];
  if (!Glyph) return null;
  return (
    <Glyph
      className={`icon icon--${name} ${className}`}
      fill={name === 'play' ? 'currentColor' : 'none'}
      focusable="false"
      {...a11y}
    />
  );
}
