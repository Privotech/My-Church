'use client';

import { useActionState } from 'react';
import { adminLoginAction } from '@/app/actions';

const initialState = { success: false, message: '' };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(adminLoginAction, initialState);

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card" aria-labelledby="admin-login-title">
        <p className="admin-eyebrow">ASWS Ministry Office</p>
        <h1 id="admin-login-title">Admin sign in</h1>
        <p>Use the private ministry admin key to manage church updates and content.</p>
        <form action={formAction} className="admin-form">
          <label htmlFor="admin-key">Admin secret key</label>
          <input id="admin-key" name="key" type="password" autoComplete="current-password" required />
          {state.message && <p className="admin-form-message" role="alert">{state.message}</p>}
          <button className="btn btn-primary btn-lg" type="submit" disabled={pending}>
            {pending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
}
