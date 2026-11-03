import { useEffect, useId, useRef, useState } from 'react';
import { site } from '../../data/site.js';
import { categories, treatmentsIn } from '../../data/treatments.js';
import { LEAD_TYPES, submitLead, validate } from '../../lib/booking.js';
import Icon from '../ui/Icon.jsx';

const NOT_SURE = 'Not sure yet — please advise';
const empty = { fullname: '', email: '', phone: '', treatment: '', message: '', date: '', time: '', age: '', payment: '' };

const TABS = [
  { mode: LEAD_TYPES.call, label: 'Consultation call', icon: 'phone', submit: 'Request consultation' },
  { mode: LEAD_TYPES.booking, label: 'Direct booking', icon: 'calendar', submit: 'Confirm booking' },
];

function Field({ id, label, required = true, error, wide, children }) {
  return (
    <div className={`field${wide ? ' field--wide' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? <span className="field__req" aria-hidden="true">*</span> : <span className="field__opt"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          <Icon name="alert" /> {error}
        </p>
      )}
    </div>
  );
}

/**
 * The single booking component: Consultation Call and Direct Booking tabs
 * posting to the leads API. Used inside the popup and inline on pages.
 */
export default function BookingPanel({ treatment = '', mode = LEAD_TYPES.booking, titleId, compact = false }) {
  const uid = useId();
  const [tab, setTab] = useState(mode);
  const [values, setValues] = useState({ ...empty, treatment });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle' }); // idle | sending | success | error
  const [today, setToday] = useState('');
  const sending = useRef(false);
  const statusRef = useRef(null);
  const tabRefs = useRef([]);

  // Client-only so prerendered and hydrated HTML match.
  useEffect(() => setToday(new Date().toLocaleDateString('en-CA')), []);
  useEffect(() => setTab(mode), [mode]);
  useEffect(() => setValues((v) => ({ ...v, treatment })), [treatment]);
  useEffect(() => {
    if (status.state === 'success' || status.state === 'error') statusRef.current?.focus();
  }, [status.state]);

  const id = (name) => `${uid}-${name}`;
  const current = TABS.find((t) => t.mode === tab);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const bind = (name) => ({
    id: id(name),
    name,
    value: values[name],
    onChange: update,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
  });

  const switchTab = (next) => {
    setTab(next);
    setErrors({});
    if (status.state === 'error') setStatus({ state: 'idle' });
    if (next === LEAD_TYPES.booking && values.treatment === NOT_SURE) setValues((v) => ({ ...v, treatment: '' }));
  };

  const onTabKey = (e, i) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + TABS.length) % TABS.length;
    switchTab(TABS[next].mode);
    tabRefs.current[next]?.focus();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending.current) return; // no duplicate submissions
    const found = validate(tab, values, today);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    sending.current = true;
    setStatus({ state: 'sending' });
    try {
      await submitLead(tab, values);
      setStatus({ state: 'success', mode: tab });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    } finally {
      sending.current = false;
    }
  };

  const reset = () => {
    setValues({ ...empty, treatment });
    setStatus({ state: 'idle' });
  };

  if (status.state === 'success') {
    const call = status.mode === LEAD_TYPES.call;
    return (
      <div className="booking__success" role="status" tabIndex={-1} ref={statusRef}>
        <Icon name="check-circle" />
        <h3 className="h3">{call ? 'Consultation request received.' : 'Booking request received.'}</h3>
        <p className="text-soft">
          Thank you, {values.fullname.trim().split(' ')[0]}. Your {call ? 'consultation request' : 'booking request'} for{' '}
          <strong>{values.treatment}</strong>
          {!call && ` on ${values.date} at ${values.time}`} has been sent to {site.name}. The studio will contact you at{' '}
          {values.phone} or {values.email}.
        </p>
        <button type="button" className="btn btn--ghost" onClick={reset}>
          Make another request
        </button>
      </div>
    );
  }

  return (
    <div className={`booking${compact ? ' booking--compact' : ''}`}>
      <div className="booking__tabs" role="tablist" aria-label="Booking type">
        {TABS.map((t, i) => (
          <button
            key={t.mode}
            ref={(el) => (tabRefs.current[i] = el)}
            type="button"
            role="tab"
            id={id(`tab-${t.mode}`)}
            aria-selected={tab === t.mode}
            aria-controls={id('panel')}
            tabIndex={tab === t.mode ? 0 : -1}
            className="booking__tab"
            onClick={() => switchTab(t.mode)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            <Icon name={t.icon} />
            {t.label}
          </button>
        ))}
      </div>

      <div id={id('panel')} role="tabpanel" aria-labelledby={id(`tab-${tab}`)}>
      <form className="form booking__form" onSubmit={onSubmit} noValidate>
        <p className="booking__hint">
          {tab === LEAD_TYPES.call
            ? 'Not sure which treatment is right for you? Request a call and we’ll talk you through it.'
            : 'Choose your treatment and a preferred date and time — the studio will confirm your slot.'}
        </p>

        <div className="form__row">
          <Field id={id('fullname')} label="Full name" error={errors.fullname}>
            <input className="field__input" autoComplete="name" placeholder="Your full name" required {...bind('fullname')} />
          </Field>
          <Field id={id('treatment')} label="Treatment" error={errors.treatment}>
            <select className="field__input" required {...bind('treatment')}>
              <option value="" disabled>
                Select a treatment…
              </option>
              {tab === LEAD_TYPES.call && <option value={NOT_SURE}>{NOT_SURE}</option>}
              {categories.map((c) => (
                <optgroup key={c.slug} label={c.name}>
                  {treatmentsIn(c.slug).map((t) => (
                    <option key={t.slug} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>
        </div>

        <div className="form__row">
          <Field id={id('phone')} label={tab === LEAD_TYPES.call ? 'Phone' : 'Contact number'} error={errors.phone}>
            <input className="field__input" type="tel" inputMode="tel" autoComplete="tel" placeholder="+63 9XX XXX XXXX" required {...bind('phone')} />
          </Field>
          <Field id={id('email')} label="Email" error={errors.email}>
            <input className="field__input" type="email" inputMode="email" autoComplete="email" placeholder="your@email.com" required {...bind('email')} />
          </Field>
        </div>

        {tab === LEAD_TYPES.booking ? (
          <>
            <div className="form__row">
              <Field id={id('date')} label="Preferred date" error={errors.date}>
                <input className="field__input" type="date" min={today || undefined} required {...bind('date')} />
              </Field>
              <Field id={id('time')} label="Preferred time" error={errors.time}>
                <input className="field__input" type="time" step="900" required {...bind('time')} />
              </Field>
            </div>
            <div className="form__row">
              <Field id={id('age')} label="Age" error={errors.age}>
                <input className="field__input" type="number" inputMode="numeric" min="1" max="120" placeholder="Your age" required {...bind('age')} />
              </Field>
              <Field id={id('payment')} label="Payment" error={errors.payment}>
                <select className="field__input" required {...bind('payment')}>
                  <option value="" disabled>
                    Select method…
                  </option>
                  {site.booking.paymentMethods.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </>
        ) : (
          <Field id={id('message')} label="Message" required={false} wide>
            <textarea className="field__input" placeholder="Tell us about your concerns…" {...bind('message')} />
          </Field>
        )}

        {status.state === 'error' && (
          <div className="form-status form-status--error" role="alert" tabIndex={-1} ref={statusRef}>
            <p className="form-status__title">Your request wasn’t sent.</p>
            <p>
              {status.message} You can also{' '}
              <a href={site.social.messenger} target="_blank" rel="noopener noreferrer">
                message us on Messenger
              </a>
              .
            </p>
          </div>
        )}

        <button type="submit" className="btn btn--block booking__submit" disabled={status.state === 'sending'} aria-busy={status.state === 'sending'}>
          {status.state === 'sending' ? (
            <>
              <Icon name="loader" /> Sending…
            </>
          ) : (
            <>
              {current.submit} <Icon name="arrow" />
            </>
          )}
        </button>
        <p className="form__note">
          Fields marked <span className="field__req">*</span> are required. Your details are sent only to {site.name}.
        </p>
      </form>
      </div>
    </div>
  );
}
