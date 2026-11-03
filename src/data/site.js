// Business information. Every value here comes from supplied material:
// the live website, the brand guidelines and the treatment price list.
// Anything not yet supplied is left as null and is simply not rendered.

export const SITE_URL = 'https://herawellnessstudio.com';

export const site = {
  name: 'Hera Wellness Studio',
  tagline: 'Discover your best self',
  intro: 'Rejuvenate, refresh, and restore at Hera Wellness Studio — where beauty meets wellness.',
  email: 'hwellnessstudio@gmail.com',
  phone: null,
  whatsapp: null,
  hours: null,
  location: {
    // Street address has not been supplied; locality comes from the live site's map pin.
    street: null,
    locality: 'Diliman, Quezon City',
    region: 'Metro Manila',
    postalCode: '1100',
    country: 'PH',
    lat: 14.642113,
    lng: 121.040428,
  },
  social: {
    facebook: 'https://www.facebook.com/herawellnessstudioph/',
    messenger: 'https://m.me/herawellnessstudioph',
    instagram: 'https://www.instagram.com/herawellnessstudio',
    tiktok: 'https://www.tiktok.com/@herawellnessstudio',
  },
  handles: {
    facebook: 'herawellnessstudioph',
    instagram: 'herawellnessstudio',
    tiktok: '@herawellnessstudio',
  },
  booking: {
    // Booking reminders from the studio: "No walk-ins, online reservations only" and "All payment methods are accepted".
    policy: ['No walk-ins — online reservations only', 'All payment methods are accepted'],
    // Leads API. The center name must stay exactly "Hera Wellness Studio".
    api: 'https://miraculous-serenity-production-5d5a.up.railway.app/api/leads',
    center: 'Hera Wellness Studio',
    // Shown in the Direct Booking form. The studio only says "All payment
    // methods are accepted" — confirm this list with the studio.
    paymentMethods: ['Cash', 'Credit / Debit Card', 'GCash', 'Maya', 'Bank Transfer'],
  },
};

const { lat, lng } = site.location;
export const mapEmbedUrl = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${lat},${lng}!6i16`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
export const fullAddress = [site.location.street, site.location.locality, `${site.location.postalCode} ${site.location.region}`]
  .filter(Boolean)
  .join(', ');
