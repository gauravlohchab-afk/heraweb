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
    // The studio's Google listing has no street address, only these coordinates.
    street: null,
    locality: 'Diliman, Quezon City',
    region: 'Metro Manila',
    postalCode: '1100',
    country: 'PH',
    lat: 14.642113,
    lng: 121.040428,
    // Google Maps ID of the Hera Wellness Studio listing.
    mapsPlaceId: '0x3397b7fbcd761243:0xcc261eefe5e1291c',
    mapsDirections:
      'https://www.google.com/maps/dir//Hera+Wellness+Studio,+14.642113,+121.040428,+Diliman,+Quezon+City,+1100+Metro+Manila/@14.642122,120.957959,58433m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x3397b7fbcd761243:0xcc261eefe5e1291c!2m2!1d121.0403581!2d14.6421242!3e0',
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

const { lat, lng, mapsPlaceId, mapsDirections } = site.location;
// Embeds the listing itself (not a bare coordinate search), so the marker and place card name the studio.
export const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${mapsPlaceId}!2s${encodeURIComponent(site.name)}!5e0!3m2!1sen!2sph`;
export const mapLinkUrl = mapsDirections;
export const fullAddress = [site.location.street, site.location.locality, `${site.location.postalCode} ${site.location.region}`]
  .filter(Boolean)
  .join(', ');
