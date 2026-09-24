import Link from 'next/link';
import { redirect } from 'next/navigation';
import AdminUpdateForm from '@/components/AdminUpdateForm';
import { adminLogoutAction } from '@/app/actions';
import { getChurchUpdates, getEvents, getGalleryImages, getSermons, getTeamMembers, getTestimonials } from '@/lib/data-service';
import { hasAdminSession } from '@/lib/admin-auth';

export default async function AdminPage() {
  if (!(await hasAdminSession())) redirect('/admin/login');

  const [updates, events, sermons, gallery, team, testimonials] = await Promise.all([
    getChurchUpdates({ includeUnpublished: true }),
    getEvents(),
    getSermons({ limit: 100 }),
    getGalleryImages(),
    getTeamMembers(),
    getTestimonials({ limit: 100 }),
  ]);

  const stats = [
    ['Updates', updates.length],
    ['Events', events.length],
    ['Sermons', sermons.length],
    ['Gallery photos', gallery.length],
    ['Team members', team.length],
    ['Testimonials', testimonials.length],
  ];

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">ASWS Ministry Office</p>
            <h1>Church admin</h1>
            <p>Keep the public church website fresh with what God is doing through the ministry.</p>
          </div>
          <form action={adminLogoutAction}>
            <button className="btn btn-secondary" type="submit">Sign out</button>
          </form>
        </header>

        <section className="admin-stat-grid" aria-label="Content totals">
          {stats.map(([label, count]) => <div className="admin-stat-card" key={label}><strong>{count}</strong><span>{label}</span></div>)}
        </section>

        <div className="admin-content-grid">
          <section className="admin-panel">
            <p className="admin-eyebrow">Publish something new</p>
            <h2>Church update</h2>
            <p>Add outreach reports, thanksgiving stories, announcements, and ministry milestones.</p>
            <AdminUpdateForm />
          </section>
          <aside className="admin-panel admin-quick-links">
            <p className="admin-eyebrow">Public pages</p>
            <h2>View your site</h2>
            <Link href="/updates">Updates page</Link>
            <Link href="/sermons">Sermons</Link>
            <Link href="/programs">Programs and events</Link>
            <Link href="/gallery">Photo gallery</Link>
            <Link href="/team">Leadership team</Link>
            <Link href="/testimonials">Testimonials</Link>
          </aside>
        </div>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div><p className="admin-eyebrow">Latest content</p><h2>Published updates</h2></div>
            <span>{updates.filter((update) => update.isPublished).length} published</span>
          </div>
          {updates.length === 0 ? <p>No updates yet. Publish the first story above.</p> : (
            <div className="admin-update-list">
              {updates.slice(0, 10).map((update) => (
                <article key={update.id}>
                  <div><h3>{update.title}</h3><p>{update.summary}</p></div>
                  <span className={update.isPublished ? 'admin-status admin-status-live' : 'admin-status'}>{update.isPublished ? 'Published' : 'Draft'}</span>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
