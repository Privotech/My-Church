import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { churchInfo } from '@/lib/church-data';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "ALL SOUL'S WINNING FOR SAVIOUR GLOBAL MINISTRY",
    template: "%s | ALL SOUL'S WINNING FOR SAVIOUR GLOBAL MINISTRY",
  },
  description:
    'Come experience the joy of belonging to a faith community that values community, worship, and purpose. Located in Ayedire, Ogbomosho, Nigeria.',
  keywords: [
    'church',
    'ministry',
    'All Souls Winning for Saviour',
    'Ogbomosho',
    'Nigeria',
    'worship',
    'sermons',
    'faith',
    'Christianity',
  ],
  authors: [{ name: "REV'D James Oyegbile" }],
  openGraph: {
    title: "ALL SOUL'S WINNING FOR SAVIOUR GLOBAL MINISTRY",
    description:
      'Come experience the joy of belonging to a faith community that values community, worship, and purpose.',
    url: '/',
    siteName: 'ASWS Global Ministry',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: "ALL SOUL'S WINNING FOR SAVIOUR GLOBAL MINISTRY",
    alternateName: 'ASWS Global Ministry',
    description:
      'A Christ-centered ministry committed to soul winning, spiritual discipleship, and empowering believers in Ogbomosho, Nigeria.',
    url: 'https://ais-pre-7edhfeeqwia26rk36zjojd-335137421450.europe-west2.run.app',
    logo: '/image/ALL_SOULS_WINNING_FOR_SAVIOUR_GLOBAL_MINISTRY-removebg-preview.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ayedire area behind royal college',
      addressLocality: 'Ogbomosho',
      addressRegion: 'Oyo State',
      addressCountry: 'NG',
    },
    telephone: churchInfo.phone,
    email: churchInfo.email,
    founder: {
      '@type': 'Person',
      name: "REV'D James Oyegbile",
      jobTitle: 'General Superintendent & Senior Pastor',
    },
  };

  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable}`}>
      <head>
        <link rel="icon" href="/image/ALL_SOULS_WINNING_FOR_SAVIOUR_GLOBAL_MINISTRY-removebg-preview.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
