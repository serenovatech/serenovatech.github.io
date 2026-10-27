import React, { useRef, useState } from 'react';
import { AlertCircle, Check, Copy, Info, Mail, RotateCcw } from 'lucide-react';
import {
  BUDGET_OPTIONS, CONTACT_METHOD_OPTIONS, DESCRIPTION_MAX, EMPTY_ENQUIRY, PHONE_METHODS, SERVICE_OPTIONS,
  buildEnquiryText, buildMailtoUrl, validateEnquiry
} from '../utils/enquiry';

const FIELD_ORDER = ['name', 'email', 'service', 'phone', 'description', 'consent'];

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for older browsers / non-HTTPS previews.
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  area.remove();
  if (!ok) throw new Error('Copy command was rejected');
}

// Project enquiry form. It never submits data anywhere: it validates the input,
// then opens a pre-filled email draft in the visitor's own email app, or lets
// them copy the details. Nothing is stored or sent to analytics.
export default function EnquiryForm({ recipient, initialService = '' }) {
  const [values, setValues] = useState({ ...EMPTY_ENQUIRY, service: initialService });
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [copyState, setCopyState] = useState('idle'); // idle | copied | failed

  const summaryRef = useRef(null);
  const resultRef = useRef(null);
  const fieldRefs = useRef({});

  const needsPhone = PHONE_METHODS.includes(values.contactMethod);
  const enquiryText = buildEnquiryText(values, recipient);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const next = { ...values, [name]: type === 'checkbox' ? checked : value };
    setValues(next);
    setCopyState('idle');
    // Once a field has an error, re-check it as the visitor fixes it.
    if (errors[name] || (name === 'contactMethod' && errors.phone)) {
      const fresh = validateEnquiry(next);
      setErrors((prev) => {
        const updated = { ...prev, [name]: fresh[name] };
        if (name === 'contactMethod') updated.phone = fresh.phone;
        return updated;
      });
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const fresh = validateEnquiry(values);
    // Only report on blur for fields the visitor has actually filled in, so
    // tabbing through an empty form doesn't light it up with errors.
    if (values[name] || errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fresh[name] }));
    }
  };

  const validateAll = () => {
    const fresh = validateEnquiry(values);
    setErrors(fresh);
    const hasErrors = Object.keys(fresh).length > 0;
    setShowSummary(hasErrors);
    if (hasErrors) {
      setPrepared(false);
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
    return !hasErrors;
  };

  const focusField = (name) => {
    fieldRefs.current[name]?.focus();
  };

  const handleCopy = async () => {
    try {
      await copyText(enquiryText);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  const handlePrepare = (event) => {
    event.preventDefault();
    if (!validateAll() || !recipient) return;
    setPrepared(true);
    setCopyState('idle');
    window.location.href = buildMailtoUrl(recipient, values);
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const handleCopyOnly = async () => {
    if (!validateAll()) return;
    await handleCopy();
  };

  const handleReset = () => {
    setValues({ ...EMPTY_ENQUIRY });
    setErrors({});
    setShowSummary(false);
    setPrepared(false);
    setCopyState('idle');
    requestAnimationFrame(() => focusField('name'));
  };

  const fieldProps = (name, { hint } = {}) => {
    const describedBy = [hint && `${name}-hint`, errors[name] && `${name}-error`].filter(Boolean).join(' ');
    return {
      id: `enquiry-${name}`,
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      ref: (el) => { fieldRefs.current[name] = el; },
      'aria-invalid': errors[name] ? true : undefined,
      'aria-describedby': describedBy || undefined,
      className: `enq-input${errors[name] ? ' has-error' : ''}`
    };
  };

  const errorText = (name) =>
    errors[name] ? (
      <p id={`${name}-error`} className="enq-error">
        <AlertCircle size={14} aria-hidden="true" />
        {errors[name]}
      </p>
    ) : null;

  const errorList = FIELD_ORDER.filter((name) => errors[name]);

  return (
    <div className="enq">
      {showSummary && errorList.length > 0 && (
        <div className="enq-summary" role="alert" tabIndex={-1} ref={summaryRef} aria-labelledby="enq-summary-title">
          <p id="enq-summary-title" className="enq-summary-title">
            Please fix {errorList.length === 1 ? 'this problem' : `these ${errorList.length} problems`}:
          </p>
          <ul>
            {errorList.map((name) => (
              <li key={name}>
                <button type="button" onClick={() => focusField(name)}>{errors[name]}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handlePrepare} noValidate aria-describedby="enq-how-it-works">
        <p id="enq-how-it-works" className="enq-intro">
          <Info size={16} aria-hidden="true" />
          <span>
            This form prepares an email in your own email app. Nothing is sent until you press <strong>Send</strong> there.
            Fields marked <span aria-hidden="true">*</span><span className="sr-only">required</span> are required.
          </span>
        </p>

        <div className="enq-grid">
          <div className="enq-field">
            <label htmlFor="enquiry-name">Full name <span className="enq-req" aria-hidden="true">*</span></label>
            <input type="text" autoComplete="name" required {...fieldProps('name')} />
            {errorText('name')}
          </div>

          <div className="enq-field">
            <label htmlFor="enquiry-email">Business email <span className="enq-req" aria-hidden="true">*</span></label>
            <input type="email" autoComplete="email" inputMode="email" required {...fieldProps('email', { hint: true })} />
            <p id="email-hint" className="enq-hint">So we can reply to you.</p>
            {errorText('email')}
          </div>

          <div className="enq-field">
            <label htmlFor="enquiry-company">Company or organization <span className="enq-opt">(optional)</span></label>
            <input type="text" autoComplete="organization" {...fieldProps('company')} />
          </div>

          <div className="enq-field">
            <label htmlFor="enquiry-service">Service required <span className="enq-req" aria-hidden="true">*</span></label>
            <select required {...fieldProps('service')}>
              <option value="">Choose a service…</option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errorText('service')}
          </div>

          <div className="enq-field">
            <label htmlFor="enquiry-budget">Project budget <span className="enq-opt">(optional)</span></label>
            <select {...fieldProps('budget')}>
              <option value="">Select a range…</option>
              {BUDGET_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="enq-field">
            <label htmlFor="enquiry-contactMethod">Preferred contact method</label>
            <select {...fieldProps('contactMethod')}>
              {CONTACT_METHOD_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {needsPhone && (
            <div className="enq-field enq-full">
              <label htmlFor="enquiry-phone">Phone number <span className="enq-req" aria-hidden="true">*</span></label>
              <input type="tel" autoComplete="tel" required {...fieldProps('phone', { hint: true })} />
              <p id="phone-hint" className="enq-hint">Include your country code if you are outside Sri Lanka.</p>
              {errorText('phone')}
            </div>
          )}

          <div className="enq-field enq-full">
            <label htmlFor="enquiry-description">Project description <span className="enq-req" aria-hidden="true">*</span></label>
            <textarea rows={6} maxLength={DESCRIPTION_MAX} required {...fieldProps('description', { hint: true })} />
            <p id="description-hint" className="enq-hint">
              What do you need, what is your current setup, and is there a deadline?{' '}
              <span className="enq-count">{values.description.length}/{DESCRIPTION_MAX}</span>
            </p>
            {errorText('description')}
          </div>

          <div className="enq-field enq-full">
            <div className="enq-check">
              <input
                type="checkbox"
                id="enquiry-consent"
                name="consent"
                checked={values.consent}
                onChange={handleChange}
                ref={(el) => { fieldRefs.current.consent = el; }}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
              />
              <label htmlFor="enquiry-consent">
                I understand this form opens an email draft that I send myself, and that Serenova Tech will use the
                details I send only to respond to my enquiry. <span className="enq-req" aria-hidden="true">*</span>
              </label>
            </div>
            {errorText('consent')}
          </div>
        </div>

        {!recipient && (
          <p className="enq-notice">
            Email enquiries are not set up yet. You can still copy your details below.
          </p>
        )}

        <div className="enq-actions">
          <button type="submit" className="btn btn-primary" disabled={!recipient}>
            <Mail size={16} aria-hidden="true" />
            <span>Prepare Email</span>
          </button>
          <button type="button" className="btn enq-btn-ghost" onClick={handleCopyOnly}>
            <Copy size={16} aria-hidden="true" />
            <span>Copy Details</span>
          </button>
        </div>

        {/* Announces copy results when the visitor copies before preparing an email. */}
        <p className="sr-only" aria-live="polite">
          {!prepared && copyState === 'copied' ? 'Enquiry details copied to the clipboard.' : ''}
        </p>
        {!prepared && copyState === 'copied' && (
          <p className="enq-copied"><Check size={16} aria-hidden="true" /> Details copied. Paste them into an email to {recipient || 'us'}.</p>
        )}
      </form>

      {prepared && (
        <div className="enq-result" role="status" tabIndex={-1} ref={resultRef} aria-labelledby="enq-result-title">
          <p id="enq-result-title" className="enq-result-title">Your email draft is ready, but it has not been sent yet</p>
          <ol>
            <li>Your email app should have opened with a draft addressed to <strong>{recipient}</strong>.</li>
            <li>Review the message, then press <strong>Send</strong> in your email app.</li>
          </ol>
          <p>
            Didn't see a draft? Your device may not have an email app set up. Copy the details and send them from any
            email account to <a href={`mailto:${recipient}`} className="pg-link">{recipient}</a>.
          </p>

          <div className="enq-actions">
            <button type="button" className="btn btn-primary" onClick={handleCopy}>
              {copyState === 'copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              <span>{copyState === 'copied' ? 'Copied' : 'Copy Enquiry Details'}</span>
            </button>
            <a href={buildMailtoUrl(recipient, values)} className="btn enq-btn-ghost">
              <Mail size={16} aria-hidden="true" />
              <span>Open Email Draft Again</span>
            </a>
            <button type="button" className="btn enq-btn-ghost" onClick={handleReset}>
              <RotateCcw size={16} aria-hidden="true" />
              <span>Start Over</span>
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            {copyState === 'copied' ? 'Enquiry details copied to the clipboard.' : ''}
          </p>
        </div>
      )}

      {copyState === 'failed' && (
        <div className="enq-manual">
          <label htmlFor="enquiry-manual-copy">
            Copying was blocked by your browser. Select the text below and copy it manually:
          </label>
          <textarea id="enquiry-manual-copy" readOnly rows={10} value={enquiryText} onFocus={(e) => e.target.select()} />
        </div>
      )}
    </div>
  );
}
