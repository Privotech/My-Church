import Link from 'next/link';
import { redirect } from 'next/navigation';
import AdminContentManager from '@/components/AdminContentManager';
import { adminLogoutAction } from '@/app/actions';
import { getAdminContentEntries, getAdminSubmissions } from '@/lib/data-service';
import { hasAdminSession } from '@/lib/admin-auth';
import { isPostgresConfigured } from '@/lib/prisma';
import { isCloudinaryConfigured, listUnreferencedCloudinaryImages } from '@/lib/media-storage';

export default async function AdminPage() {
  if (!(await hasAdminSession())) redirect('/admin/login');

  const [saved, submissions] = await Promise.all([getAdminContentEntries(), getAdminSubmissions()]);
  const toDate = (date: Date) => date.toISOString().slice(0, 10);
  const toDateTime = (date: Date | null) => date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '';
  const managedContent = {
    updates: saved.updates.map((item) => ({ id: item.id, title: item.title, detail: item.summary, status: item.deletedAt ? 'Trash' : !item.isPublished ? 'Draft' : item.publishAt && item.publishAt > new Date() ? 'Scheduled' : 'Published', fields: { summary: item.summary, content: item.content, publishedAt: toDate(item.publishedAt), publishAt: toDateTime(item.publishAt), imageUrl: item.imageUrl || '', isPublished: String(item.isPublished) } })),
    sermons: saved.sermons.map((item) => ({ id: item.id, title: item.title, detail: item.speaker, status: item.deletedAt ? 'Trash' : !item.isPublished ? 'Draft' : item.publishAt && item.publishAt > new Date() ? 'Scheduled' : 'Published', fields: { speaker: item.speaker, date: toDate(item.date), description: item.description, series: item.series || '', videoUrl: item.videoUrl || '', audioUrl: item.audioUrl || '', isPublished: String(item.isPublished), publishAt: toDateTime(item.publishAt) } })),
    programs: saved.events.map((item) => ({ id: item.id, title: item.title, detail: `${item.category === 'MONTHLY' ? 'Monthly' : 'Weekly'} · ${item.dayOrFrequency}`, status: item.deletedAt ? 'Trash' : !item.isPublished ? 'Draft' : item.publishAt && item.publishAt > new Date() ? 'Scheduled' : item.status, fields: { category: item.category, dayOrFrequency: item.dayOrFrequency, time: item.time, description: item.description || '', status: item.status, eventDate: item.eventDate ? toDate(item.eventDate) : '', isFeatured: String(item.isFeatured), isPublished: String(item.isPublished), publishAt: item.publishAt ? toDate(item.publishAt) : '' } })),
    gallery: saved.gallery.map((item) => ({ id: item.id, title: item.title, detail: item.category, status: !item.isPublished ? 'Draft' : item.publishAt && item.publishAt > new Date() ? 'Scheduled' : 'Published', fields: { category: item.category, description: item.description, date: toDate(item.date), location: item.location, imageUrl: item.imageUrl, featured: String(item.featured), isPublished: String(item.isPublished), publishAt: item.publishAt ? toDate(item.publishAt) : '', sortOrder: String(item.sortOrder) } })),
    leadership: saved.team.map((item) => ({ id: item.id, title: item.name, detail: item.role, status: !item.isPublished ? 'Draft' : item.publishAt && item.publishAt > new Date() ? 'Scheduled' : 'Published', fields: { name: item.name, role: item.role, description: item.quoteOrDescription, imageUrl: item.imageUrl || '', isPublished: String(item.isPublished), publishAt: item.publishAt ? toDate(item.publishAt) : '' } })),
    testimonials: saved.testimonials.map((item) => ({ id: item.id, title: item.title, detail: `By ${item.name}`, status: item.deletedAt ? 'Trash' : !item.isApproved ? 'Draft' : item.publishAt && item.publishAt > new Date() ? 'Scheduled' : 'Published', fields: { name: item.name, locationOrRole: item.locationOrRole || '', category: item.category, story: item.story, scripture: item.scripture || '', isApproved: String(item.isApproved), publishAt: item.publishAt ? toDate(item.publishAt) : '' } })),
  };

  const databaseConfigured = isPostgresConfigured();
  const mediaConfigured = isCloudinaryConfigured();
  const unusedImages = mediaConfigured ? await listUnreferencedCloudinaryImages(saved.imageReferences ?? []) : [];

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">ASWS Ministry Office</p>
            <h1>Church admin</h1>
            <p>Keep the public church website fresh with what God is doing through the ministry.</p>
          </div>
          <div className="admin-header-actions">
            <Link href="/" className="btn btn-outline-dark">View site</Link>
            <form action={adminLogoutAction}>
              <button className="btn btn-secondary" type="submit">Sign out</button>
            </form>
          </div>
        </header>

        <AdminContentManager
          managedContent={managedContent}
          databaseConfigured={databaseConfigured}
          databaseAvailable={saved.databaseAvailable}
          mediaConfigured={mediaConfigured}
          activity={saved.activity.map((item) => ({ action: item.action, section: item.section, title: item.title, createdAt: item.createdAt.toISOString() }))}
          unusedImages={unusedImages}
          submissions={{
            available: submissions.available,
            contacts: submissions.contactMessages.map((item) => ({ name: item.name, email: item.email, subject: item.subject || 'General inquiry', message: item.message, createdAt: item.createdAt.toISOString() })),
            prayers: submissions.prayerRequests.map((item) => ({ name: item.name, request: item.request, isPrivate: item.isPrivate, createdAt: item.createdAt.toISOString() })),
          }}
          publicPages={[
            { label: 'Updates', href: '/updates' }, { label: 'Sermons', href: '/sermons' },
            { label: 'Programs', href: '/programs' }, { label: 'Gallery', href: '/gallery' },
            { label: 'Leadership', href: '/team' }, { label: 'Testimonials', href: '/testimonials' },
          ]}
        />
      </div>
    </main>
  );
}
