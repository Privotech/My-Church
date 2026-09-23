import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import SermonList from '@/components/SermonList';
import SocialShareWidget from '@/components/SocialShareWidget';
import { getSermons } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Sermons',
  description:
    "Listen to our latest messages, teachings, and sermons from God's word at All Soul's Winning for Saviour Global Ministry.",
};

export default async function SermonsPage() {
  const sermons = await getSermons({ limit: 50 });

  return (
    <>
      <PageHeader
        title="Sermons"
        subtitle="Listen to our latest messages and stay connected with God's word."
      />

      <section className="section section-light" aria-labelledby="sermons-heading">
        <div className="container">
          <SocialShareWidget
            title="Share Inspiring Sermons With Family & Friends"
            description="Help bless someone today by sharing our spirit-filled messages and audio teachings across your social circles."
            url="/sermons"
            layout="banner"
          />

          <h2 id="sermons-heading">Recent Sermons</h2>
          <SermonList initialSermons={sermons} />
        </div>
      </section>
    </>
  );
}
