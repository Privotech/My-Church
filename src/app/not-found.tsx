import Link from 'next/link';
import { Home, Compass, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: '#faf8f5',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '560px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(197, 155, 39, 0.15)',
            color: 'var(--accent-gold-dark)',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}
        >
          Page Not Found
        </span>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontFamily: 'var(--font-serif), Georgia, serif',
            color: 'var(--primary-navy)',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}
        >
          We Couldn't Find That Page
        </h1>
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          The page you are looking for may have been moved or is no longer available.
          Let us guide you back to our sanctuary home.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" className="btn btn-primary btn-lg">
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
          <Link href="/programs" className="btn btn-outline-dark btn-lg">
            <Compass size={18} />
            <span>View Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
