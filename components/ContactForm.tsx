'use client';

import React, { useActionState } from 'react';
import { submitContactAction } from '@/app/actions';
import { FormSubmissionResult } from '@/lib/types';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const initialState: FormSubmissionResult = {
  success: false,
  message: '',
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactAction, initialState);

  return (
    <div className="form-card">
      <h3 style={{ color: 'var(--primary-navy)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
        Send Us a Message
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
        Have questions about service times, membership, or church activities? Fill out the form below.
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
          <label htmlFor="contact-name" className="form-label">
            Full Name <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className="form-control"
            placeholder="e.g. Brother John or Sister Mary"
            disabled={isPending}
          />
          {state.errors?.name && (
            <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.35rem' }} role="alert">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="contact-email" className="form-label">
            Email Address <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className="form-control"
            placeholder="your.email@example.com"
            disabled={isPending}
          />
          {state.errors?.email && (
            <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.35rem' }} role="alert">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="contact-phone" className="form-label">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            className="form-control"
            placeholder="08035745728"
            disabled={isPending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            className="form-control"
            placeholder="General Inquiry, Counseling, Visitation..."
            disabled={isPending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-message" className="form-label">
            Message <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            className="form-control"
            placeholder="How can we assist you or pray with you?"
            disabled={isPending}
          />
          {state.errors?.message && (
            <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.35rem' }} role="alert">
              {state.errors.message[0]}
            </p>
          )}
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
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
