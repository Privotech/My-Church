'use client';

import { useActionState } from 'react';
import { createChurchUpdateAction } from '@/app/actions';

const initialState = { success: false, message: '' };

export default function AdminUpdateForm() {
  const [state, formAction, pending] = useActionState(createChurchUpdateAction, initialState);

  return (
    <form action={formAction} className="admin-form admin-update-form">
      <div className="admin-form-grid">
        <div>
          <label htmlFor="update-title">Title</label>
          <input id="update-title" name="title" placeholder="e.g. Community outreach at Ayedire" required />
        </div>
        <div>
          <label htmlFor="update-date">Publication date</label>
          <input id="update-date" name="publishedAt" type="date" />
        </div>
      </div>
      <label htmlFor="update-summary">Short summary</label>
      <input id="update-summary" name="summary" placeholder="A short description for the updates list" required />
      <label htmlFor="update-content">What happened?</label>
      <textarea id="update-content" name="content" rows={6} placeholder="Share the story, impact, and thanksgiving..." required />
      <label htmlFor="update-image">Image URL (optional)</label>
      <input id="update-image" name="imageUrl" type="url" placeholder="https://..." />
      <label className="admin-checkbox">
        <input name="isPublished" type="checkbox" defaultChecked />
        Publish this update immediately
      </label>
      {state.message && (
        <p className={state.success ? 'admin-form-success' : 'admin-form-message'} role="status">
          {state.message}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? 'Saving…' : 'Publish update'}
      </button>
    </form>
  );
}
