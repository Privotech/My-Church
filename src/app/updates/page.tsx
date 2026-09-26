import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { getChurchUpdates } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Church Updates',
  description: 'Recent ministry updates, outreach stories, and announcements from ASWS Global Ministry.',
};

export default async function UpdatesPage() {
  const updates = await getChurchUpdates();
  return (
    <>
      <PageHeader title="Church Updates" subtitle="See what God is doing through our worship, outreach, and ministry family." eyebrow="Life at ASWS" />
      <section className="section section-light">
        <div className="container">
          {updates.length === 0 ? (
            <div className="empty-state"><h2>Updates coming soon</h2><p>We are preparing the latest stories from our church family.</p></div>
          ) : (
            <div className="updates-grid">
              {updates.map((update) => (
                <article className="update-card" key={update.id}>
                  {update.imageUrl && <img src={update.imageUrl} alt="" />}
                  <div className="update-card-body">
                    <p className="section-eyebrow">{new Date(update.publishedAt).toLocaleDateString()}</p>
                    <h2>{update.title}</h2>
                    <p className="update-summary">{update.summary}</p>
                    <p>{update.content}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
