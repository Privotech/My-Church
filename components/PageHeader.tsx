import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actionText?: string;
  actionHref?: string;
}

export default function PageHeader({
  title,
  subtitle,
  eyebrow = 'All Soul’s Winning for Saviour Global Ministry',
  actionText,
  actionHref,
}: PageHeaderProps) {
  return (
    <header className="page-hero" role="banner">
      <div className="container page-hero-content">
        {eyebrow && (
          <div className="page-hero-eyebrow">
            <span>✝</span>
            <span>{eyebrow}</span>
          </div>
        )}

        <h1 className="page-hero-title">{title}</h1>

        {subtitle && <p className="page-hero-sub">{subtitle}</p>}

        {actionText && actionHref && (
          <div style={{ marginTop: '2rem' }}>
            <Link href={actionHref} className="btn btn-primary btn-lg">
              <span>{actionText}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
