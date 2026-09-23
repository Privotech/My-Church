'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { churchInfo } from '@/lib/church-data';
import {
  Calendar,
  Clock,
  Phone,
  Heart,
  Menu,
  X,
  MapPin,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/programs', label: 'Programs' },
    { href: '/sermons', label: 'Sermons' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/team', label: 'Our Team' },
    { href: '/visit', label: 'Plan a Visit' },
    { href: '/contact', label: 'Contact & Prayer' },
  ];

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <aside className="top-bar" aria-label="Church Announcements and Quick Links">
        <div className="container top-bar-inner">
          <div className="top-bar-service">
            <span className="top-bar-badge">Next Service</span>
            <Clock size={14} style={{ color: 'var(--accent-gold-light)' }} />
            <span>Sunday Worship: 9:30 AM – 12:00 PM</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <MapPin size={14} style={{ color: 'var(--accent-gold-light)' }} />
            <span>Ayedire, Ogbomosho</span>
          </div>

          <div className="top-bar-actions">
            <a href={`tel:${churchInfo.phone}`} className="top-bar-link" aria-label="Call church office">
              <Phone size={13} style={{ color: 'var(--accent-gold-light)' }} />
              <span>{churchInfo.phone}</span>
            </a>
            <Link href="/contact" className="top-bar-link">
              <BookOpen size={13} style={{ color: 'var(--accent-gold-light)' }} />
              <span>Request Prayer</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Sticky Header */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Logo & Brand Identity */}
          <Link href="/" className="brand-wrapper" aria-label="All Soul's Winning for Saviour Global Ministry Home">
            <div className="brand-logo">
              <Image
                src={churchInfo.logoUrl}
                alt="All Soul's Winning for Saviour Emblem"
                width={56}
                height={56}
                priority
                style={{ objectFit: 'contain' }}
                className="church-logo-img"
              />
            </div>
            <div className="brand-text">
              <span className="brand-name">ALL SOUL'S WINNING</span>
              <span className="brand-sub">FOR SAVIOUR GLOBAL MINISTRY</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-desktop" aria-label="Main Navigation">
            <ul className="nav-links">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action: Give CTA & Mobile Toggle */}
          <div className="nav-cta-group">
            <Link href="/give" className="btn btn-primary btn-sm" aria-label="Give online or bank transfer">
              <Heart size={15} fill="currentColor" />
              <span>Give / Support</span>
            </Link>

            <button
              className="nav-toggle-btn"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="nav-menu-mobile" role="dialog" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} style={{ opacity: 0.5 }} />
                </Link>
              );
            })}
            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Link
                href="/give"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setIsOpen(false)}
              >
                <Heart size={16} fill="currentColor" />
                <span>Give / Support the Ministry</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
