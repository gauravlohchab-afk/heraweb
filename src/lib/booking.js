import { site } from '../data/site.js';

/**
 * Leads API client for the two booking modes.
 *
 *   type=call     → requires fullname, email, phone, treatment
 *   type=booking  → also requires schedule
 *
 * Required fields come from the API's own validation responses. Extra fields
 * (message, age, paymentMethod, preferredDate, preferredTime) are sent
 * alongside them for the studio's records.
 */
export const LEAD_TYPES = { call: 'call', booking: 'booking' };

export function leadUrl(type) {
  return `${site.booking.api}?type=${encodeURIComponent(type)}&center=${encodeURIComponent(site.booking.center)}`;
}

export function buildPayload(type, v) {
  const base = {
    fullname: v.fullname.trim(),
    email: v.email.trim(),
    phone: v.phone.trim(),
    treatment: v.treatment,
  };
  if (type === LEAD_TYPES.call) {
    return { ...base, ...(v.message.trim() && { message: v.message.trim() }) };
  }
  return {
    ...base,
    schedule: `${v.date}T${v.time}`,
    preferredDate: v.date,
    preferredTime: v.time,
    age: Number(v.age),
    paymentMethod: v.payment,
  };
}

/** Resolves with the parsed response on a 2xx; throws an Error with a readable message otherwise. */
export async function submitLead(type, values) {
  let res;
  try {
    res = await fetch(leadUrl(type), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(buildPayload(type, values)),
    });
  } catch {
    throw new Error('We couldn’t reach the booking service. Please check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data.error || data.message || (Array.isArray(data.errors) && data.errors.map((e) => e.msg || e.message || e).join(' '));
    throw new Error(detail ? `The booking service said: ${detail}` : `The booking service returned an error (${res.status}). Please try again.`);
  }
  return data;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;

export function validate(type, v, today) {
  const e = {};
  if (!v.fullname.trim()) e.fullname = 'Please enter your full name.';
  if (!EMAIL.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (!PHONE.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (!v.treatment) e.treatment = 'Please choose a treatment.';
  if (type === LEAD_TYPES.booking) {
    if (!v.date) e.date = 'Please choose a date.';
    else if (today && v.date < today) e.date = 'Please choose today or a future date.';
    if (!v.time) e.time = 'Please choose a time.';
    const age = Number(v.age);
    if (!v.age || !Number.isInteger(age) || age < 1 || age > 120) e.age = 'Please enter your age.';
    if (!v.payment) e.payment = 'Please choose a payment method.';
  }
  return e;
}
