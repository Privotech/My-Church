'use client';

import React, { useActionState } from 'react';
import { submitPrayerRequestAction } from '@/app/actions';
import { FormSubmissionResult } from '@/lib/types';
import { Send, CheckCircle2, AlertCircle, Loader2, Lock, ShieldCheck } from 'lucide-react';

const initialState: FormSubmissionResult = {
  success: false,
  message: '',
};

export default function PrayerRequestForm() {
  const [state, formAction, isPending] = useActionState(submitPrayerRequestAction, initialState);

  return (
    <div className="form-card" style={{ border: '2px solid var(--border-gold)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ color: 'var(--primary-navy)', fontSize: '1.6rem', margin: 0 }}>
          Submit a Prayer Request
        </h3>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'var(--accent-gold-subtle)',
            color: 'var(--text-gold)',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          <Lock size={12} />
          <span>Pastoral Confidentiality</span>
        </span>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem', fontStyle: 'italic' }}>
        "For where two or three are gathered together in my name, there am I in the midst of them." — Matthew 18:20
      </p>

      {state.message && (
        <div
          className={`form-alert ${
            state.success ? 'form-alert-success' : 'form-alert-error'
          }`}
          role="status"
          aria-live="polite"
        >
          {state.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} noValidate>
        <div className="form-group">
          <label htmlFor="prayer-name" className="form-label">
            Your Name <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            type="text"
            id="prayer-name"
            name="name"
            required
            className="form-control"
            placeholder="Your name or 'Anonymous'"
            disabled={isPending}
          />
          {state.errors?.name && (
            <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.35rem' }} role="alert">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="prayer-email" className="form-label">
            Email Address (Optional, for pastoral reply)
          </label>
          <input
            type="email"
            id="prayer-email"
            name="email"
            className="form-control"
            placeholder="your.email@example.com"
            disabled={isPending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="prayer-phone" className="form-label">
            Phone Number (Optional, for phone prayer)
          </label>
          <input
            type="tel"
            id="prayer-phone"
            name="phone"
            className="form-control"
            placeholder="08035745728"
            disabled={isPending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="prayer-request" className="form-label">
            Your Prayer Need or Petition <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <textarea
            id="prayer-request"
            name="request"
            rows={5}
            required
            className="form-control"
            placeholder="Please describe your health, spiritual, family, or financial prayer request..."
            disabled={isPending}
          />
          {state.errors?.request && (
            <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.35rem' }} role="alert">
              {state.errors.request[0]}
            </p>
          )}
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <input
            type="checkbox"
            id="prayer-private"
            name="isPrivate"
            defaultChecked
            disabled={isPending}
            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-gold)' }}
          />
          <label htmlFor="prayer-private" style={{ cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Keep this request confidential to pastors & intercessory prayer leaders only
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Submitting Prayer Need...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Submit to Prayer Intercessors</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
