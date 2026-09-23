'use client';

import React, { useState } from 'react';
import { churchInfo } from '@/lib/church-data';
import { Copy, Check, Building2, User, CreditCard, ShieldCheck } from 'lucide-react';

export default function BankTransferCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(churchInfo.bankDetails.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '2px solid var(--accent-gold)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, var(--accent-gold), #b45309)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'var(--accent-gold-subtle)',
              color: 'var(--text-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Building2 size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', margin: 0 }}>
              Official Church Bank Account
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Direct Bank Transfer / Mobile App Deposit
            </span>
          </div>
        </div>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          <ShieldCheck size={14} />
          <span>Verified Account</span>
        </span>
      </div>

      <div
        style={{
          background: 'var(--surface-muted)',
          borderRadius: '14px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
            Bank Name
          </span>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            {churchInfo.bankDetails.bankName}
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
            Account Name
          </span>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
            {churchInfo.bankDetails.accountName}
          </div>
        </div>

        <div
          style={{
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
              Account Number
            </span>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '1.85rem',
                fontWeight: 800,
                color: 'var(--primary-navy)',
                letterSpacing: '0.08em',
              }}
            >
              {churchInfo.bankDetails.accountNumber}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`btn ${copied ? 'btn-primary' : 'btn-outline-dark'}`}
            style={{
              padding: '0.65rem 1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Account Number</span>
              </>
            )}
          </button>
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic' }}>
        <strong>Reference Note:</strong> When making a transfer, please include your name and category
        (e.g., "Tithe", "Offering", "Welfare", "Building") as the narration so our finance team can record it accurately.
      </p>
    </div>
  );
}
