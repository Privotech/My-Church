'use client';

import { ReactNode, useActionState, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Heart, Images, LayoutDashboard, Mic2, Newspaper, Pencil, Plus, Sparkles, Trash2, Users } from 'lucide-react';
import {
  createChurchUpdateAction,
  createEventAction,
  createGalleryImageAction,
  createSermonAction,
  createTeamMemberAction,
  createTestimonialAction,
  deleteChurchUpdateAction,
  deleteEventAction,
  deleteGalleryImageAction,
  deleteSermonAction,
  deleteTeamMemberAction,
  deleteTestimonialAction,
  updateChurchUpdateAction,
  updateEventAction,
  updateGalleryImageAction,
  updateSermonAction,
  updateTeamMemberAction,
  updateTestimonialAction,
  restoreAdminContentAction,
  moveGalleryImageAction,
  deleteUnusedCloudinaryImageAction,
} from '@/app/actions';
import { FormSubmissionResult } from '@/lib/types';

type ContentAction = (state: FormSubmissionResult | null, data: FormData) => Promise<FormSubmissionResult>;
type SectionId = 'updates' | 'sermons' | 'programs' | 'gallery' | 'leadership' | 'testimonials';
type ManagedEntry = { id: string; title: string; detail: string; status?: string; fields: Record<string, string> };
type ManagedContent = Record<SectionId, ManagedEntry[]>;
type RemoveAction = ContentAction;
type AdminView = 'landing' | 'add' | 'manage';

const editActions: Record<SectionId, ContentAction> = {
  updates: updateChurchUpdateAction,
  sermons: updateSermonAction,
  programs: updateEventAction,
  gallery: updateGalleryImageAction,
  leadership: updateTeamMemberAction,
  testimonials: updateTestimonialAction,
};

const removeActions: Record<SectionId, RemoveAction> = {
  updates: deleteChurchUpdateAction,
  sermons: deleteSermonAction,
  programs: deleteEventAction,
  gallery: deleteGalleryImageAction,
  leadership: deleteTeamMemberAction,
  testimonials: deleteTestimonialAction,
};

function ContentForm({ action, button, children }: { action: ContentAction; button: string; children: ReactNode }) {
  const [state, formAction, pending] = useActionState(action, { success: false, message: '' });
  return (
    <form action={formAction} className="admin-form">
      {children}
      {state.message && <p className={state.success ? 'admin-form-success' : 'admin-form-message'} role="status">{state.message}</p>}
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? 'Saving…' : button}</button>
    </form>
  );
}

function PhotoField({ id = 'image' }: { id?: string }) {
  return <div className="admin-photo-field"><label htmlFor={id}>Photo from your device <span>(optional)</span></label><input id={id} name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" /><small>JPEG, PNG, WebP or AVIF. Up to 8 MB.</small></div>;
}

function RemoveEntryForm({ item, section, action }: { item: ManagedEntry; section: string; action: RemoveAction }) {
  const [state, formAction, pending] = useActionState(action, { success: false, message: '' });
  return (
    <>
    <form
      action={formAction}
      className="admin-remove-form"
      onSubmit={(event) => {
        if (!window.confirm(`Move “${item.title}” from ${section} to trash? You can restore it right away.`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={item.id} />
      {state.message && <span className={state.success ? 'admin-form-success' : 'admin-form-message'} role="status">{state.message}</span>}
      <button type="submit" disabled={pending} aria-label={`Remove ${item.title}`} title={`Remove ${item.title}`}><Trash2 size={14} />{pending ? 'Removing…' : 'Remove'}</button>
    </form>
    {state.success && <RestoreEntryForm item={item} section={section} />}
    </>
  );
}

function RestoreEntryForm({ item, section }: { item: ManagedEntry; section: string }) {
  const [state, formAction, pending] = useActionState(restoreAdminContentAction, { success: false, message: '' });
  const key = ({ updates: 'updates', sermons: 'sermons', programs: 'programs', gallery: 'gallery', leadership: 'leadership', testimonials: 'testimonials' } as Record<string, string>)[section] ?? section;
  return <form action={formAction}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="section" value={key} /><input type="hidden" name="title" value={item.title} /><button type="submit" className="admin-undo-button" disabled={pending}>{pending ? 'Restoring…' : 'Undo'}</button>{state.message && <span role="status">{state.message}</span>}</form>;
}

function GalleryOrderForm({ item, direction }: { item: ManagedEntry; direction: 'up' | 'down' }) {
  const [state, formAction, pending] = useActionState(moveGalleryImageAction, { success: false, message: '' });
  return <form action={formAction}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="direction" value={direction} /><button type="submit" disabled={pending} aria-label={`Move ${item.title} ${direction}`}>{direction === 'up' ? '↑' : '↓'}</button>{state.message && <span className="sr-only" role="status">{state.message}</span>}</form>;
}

function UnusedImageForm({ asset }: { asset: { publicId: string; url: string; bytes: number } }) {
  const [state, formAction, pending] = useActionState(deleteUnusedCloudinaryImageAction, { success: false, message: '' });
  return <form action={formAction} className="admin-unused-image" onSubmit={(event) => { if (!window.confirm('Permanently remove this unused image from Cloudinary?')) event.preventDefault(); }}><input type="hidden" name="publicId" value={asset.publicId} /><img src={asset.url} alt="Unused Cloudinary upload" /><span>{asset.publicId}</span><small>{Math.round(asset.bytes / 1024)} KB</small><button type="submit" disabled={pending}>{pending ? 'Removing…' : 'Remove unused image'}</button>{state.message && <small role="status">{state.message}</small>}</form>;
}

function EditContentForm({ item, section }: { item: ManagedEntry; section: SectionId }) {
  const [state, formAction, pending] = useActionState(editActions[section], { success: false, message: '' });
  const value = (name: string) => item.fields[name] ?? '';
  const input = (label: string, name: string, type = 'text', required = true) => (
    <><label htmlFor={`edit-${item.id}-${name}`}>{label}</label><input id={`edit-${item.id}-${name}`} name={name} type={type} defaultValue={value(name)} required={required} /></>
  );
  const area = (label: string, name: string, required = true, rows = 4) => (
    <><label htmlFor={`edit-${item.id}-${name}`}>{label}</label><textarea id={`edit-${item.id}-${name}`} name={name} defaultValue={value(name)} rows={rows} required={required} /></>
  );

  return (
    <form action={formAction} className="admin-form admin-edit-form">
      <input type="hidden" name="id" value={item.id} />
      <div className="admin-edit-form-title"><span className="admin-editor-icon"><Pencil size={18} /></span><div><p className="admin-eyebrow">Editing {section}</p><h3>{item.title}</h3></div></div>
      {section === 'updates' && <>{input('Title', 'title')}{input('Publish date', 'publishedAt', 'date')}{input('Short summary', 'summary')}{area('Full update', 'content')}<label>Replace photo <span>(optional)</span></label><input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" /><label>Schedule for <span>(optional)</span></label><input name="publishAt" type="datetime-local" defaultValue={value('publishAt')} /><label className="admin-checkbox"><input name="isPublished" type="checkbox" defaultChecked={value('isPublished') === 'true'} /> Publish</label></>}
      {section === 'sermons' && <>{input('Sermon title', 'title')}{input('Speaker', 'speaker')}{input('Date preached', 'date', 'date')}{input('Series', 'series', 'text', false)}{area('Description', 'description', true, 3)}{input('Video link', 'videoUrl', 'url', false)}{input('Audio link', 'audioUrl', 'url', false)}<label>Schedule for <span>(optional)</span></label><input name="publishAt" type="datetime-local" defaultValue={value('publishAt')} /><label className="admin-checkbox"><input name="isPublished" type="checkbox" defaultChecked={value('isPublished') === 'true'} /> Publish</label></>}
      {section === 'programs' && <>{input('Program name', 'title')}<label htmlFor={`edit-${item.id}-category`}>Program type</label><select id={`edit-${item.id}-category`} name="category" defaultValue={value('category')}><option value="WEEKLY">Weekly</option><option value="MONTHLY">Monthly</option></select>{input('Day or frequency', 'dayOrFrequency')}{input('Time', 'time')}{area('Description', 'description', false, 3)}{input('Event date', 'eventDate', 'date', false)}<label>Status</label><select name="status" defaultValue={value('status')}><option value="UPCOMING">Upcoming</option><option value="PAST">Past</option><option value="CANCELLED">Cancelled</option></select><label className="admin-checkbox"><input name="isFeatured" type="checkbox" defaultChecked={value('isFeatured') === 'true'} /> Feature event</label><label className="admin-checkbox"><input name="isPublished" type="checkbox" defaultChecked={value('isPublished') === 'true'} /> Publish</label><label>Schedule publication <span>(optional)</span></label><input name="publishAt" type="datetime-local" defaultValue={value('publishAt')} /></>}
      {section === 'gallery' && <>{input('Photo title', 'title')}<label htmlFor={`edit-${item.id}-category`}>Category</label><select id={`edit-${item.id}-category`} name="category" defaultValue={value('category')}><option value="EVENTS">Events</option><option value="PROGRAMS">Programs</option><option value="OUTREACH">Outreach</option><option value="WORSHIP">Worship</option></select>{area('Description', 'description', true, 3)}{input('Date', 'date', 'date')}{input('Location', 'location')}{value('imageUrl') && <p className="admin-current-image">A photo is saved. Choose a file below to replace it.</p>}<label>Replace photo <span>(optional)</span></label><input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" /><label>Schedule publication <span>(optional)</span></label><input name="publishAt" type="datetime-local" defaultValue={value('publishAt')} /><label className="admin-checkbox"><input name="isPublished" type="checkbox" defaultChecked={value('isPublished') === 'true'} /> Publish</label><label className="admin-checkbox"><input name="featured" type="checkbox" defaultChecked={value('featured') === 'true'} /> Feature this photo</label></>}
      {section === 'leadership' && <>{input('Name', 'name')}{input('Role', 'role')}{area('Introduction', 'description')}{value('imageUrl') && <p className="admin-current-image">A photo is saved. Choose a file below to replace it.</p>}<label>Replace photo <span>(optional)</span></label><input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" /><label>Schedule publication <span>(optional)</span></label><input name="publishAt" type="datetime-local" defaultValue={value('publishAt')} /><label className="admin-checkbox"><input name="isPublished" type="checkbox" defaultChecked={value('isPublished') === 'true'} /> Publish</label></>}
      {section === 'testimonials' && <>{input('Name', 'name')}{input('Location or role', 'locationOrRole', 'text', false)}{input('Category', 'category')}{input('Testimony title', 'title')}{area('Testimony', 'story')}{input('Scripture', 'scripture', 'text', false)}<label>Schedule for <span>(optional)</span></label><input name="publishAt" type="datetime-local" defaultValue={value('publishAt')} /><label className="admin-checkbox"><input name="isApproved" type="checkbox" defaultChecked={value('isApproved') === 'true'} /> Show publicly</label></>}
      {state.message && <p className={state.success ? 'admin-form-success' : 'admin-form-message'} role="status">{state.message}</p>}
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? 'Saving…' : 'Save changes'}</button>
    </form>
  );
}

export default function AdminContentManager({ managedContent, databaseConfigured, databaseAvailable, mediaConfigured, publicPages, activity = [], unusedImages = [], submissions = { available: false, contacts: [], prayers: [] } }: { managedContent: ManagedContent; databaseConfigured: boolean; databaseAvailable: boolean; mediaConfigured: boolean; publicPages: { label: string; href: string }[]; activity?: { action: string; section: string; title: string; createdAt: string }[]; unusedImages?: { publicId: string; url: string; bytes: number }[]; submissions?: { available: boolean; contacts: { name: string; email: string; subject: string; message: string; createdAt: string }[]; prayers: { name: string; request: string; isPrivate: boolean; createdAt: string }[] } }) {
  const [view, setView] = useState<AdminView>('landing');
  const [activeSection, setActiveSection] = useState<SectionId>('updates');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [galleryFileNames, setGalleryFileNames] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const sections = [
    { id: 'updates', label: 'Updates', description: 'News and church activities', Icon: Newspaper },
    { id: 'sermons', label: 'Sermons', description: 'Messages and teaching', Icon: Mic2 },
    { id: 'programs', label: 'Programs', description: 'Services and events', Icon: CalendarDays },
    { id: 'gallery', label: 'Gallery', description: 'Photos from church life', Icon: Images },
    { id: 'leadership', label: 'Leadership', description: 'Ministry team members', Icon: Users },
    { id: 'testimonials', label: 'Testimonials', description: 'Stories of faith', Icon: Heart },
  ] as const;
  const selectedSection = sections.find((section) => section.id === activeSection) ?? sections[0];
  const editingItem = managedContent[activeSection].find((item) => item.id === editingId);
  const previewItem = managedContent[activeSection].find((item) => item.id === previewId);
  const visibleEntries = managedContent[activeSection].filter((item) => {
    const q = search.trim().toLowerCase();
    return (!q || `${item.title} ${item.detail}`.toLowerCase().includes(q)) && (statusFilter === 'ALL' || item.status === statusFilter);
  });
  const totalContent = Object.values(managedContent).reduce((count, items) => count + items.length, 0);
  const draftCount = Object.values(managedContent).flat().filter((item) => item.status === 'Draft' || item.status === 'Scheduled').length;

  return (
    <section className="admin-manage-section" id="manage-content">
      {view === 'landing' ? (
        <div className="admin-landing">
          <div className="admin-welcome-card">
            <div className="admin-welcome-copy"><p className="admin-eyebrow"><Sparkles size={15} /> Ministry website workspace</p><h2>Welcome back.<br /><span>What would you like to do?</span></h2><p>Keep the church website up to date in a few simple steps. Add new stories and ministry moments, or manage what visitors can already see.</p></div>
            <div className="admin-welcome-mark" aria-hidden="true"><LayoutDashboard size={78} strokeWidth={1.1} /></div>
            <div className="admin-welcome-footer"><span><Check size={16} /> Changes are saved to the church website</span><span>ASWS Global Ministry</span></div>
          </div>
          {!databaseConfigured && <p className="admin-storage-note" role="status">Add <code>DATABASE_URL</code> to <code>.env</code> before publishing content.</p>}
          {databaseConfigured && !databaseAvailable && <p className="admin-storage-note admin-database-warning" role="alert">Neon is not responding right now, so saved content could not load. Check your connection and refresh this page.</p>}
          {!mediaConfigured && <p className="admin-storage-note" role="status">Photo uploads are stored in Cloudinary. Set CLOUDINARY_URL in .env to enable uploads.</p>}
          <div className="admin-overview-stats"><article><strong>{totalContent}</strong><span>Content items</span></article><article><strong>{draftCount}</strong><span>Drafts & scheduled</span></article><article><strong>{activity.length}</strong><span>Recent changes</span></article></div>
          <div className="admin-action-cards">
            <button type="button" className="admin-action-card admin-action-add" onClick={() => setView('add')}>
              <span className="admin-action-icon"><Plus size={25} /></span><span className="admin-action-label">CREATE</span><strong>Add new content</strong><span className="admin-action-description">Publish an update, sermon, program, photo, team member, or testimony.</span><span className="admin-action-link">Choose a section <ArrowRight size={17} /></span>
            </button>
            <button type="button" className="admin-action-card admin-action-manage" onClick={() => { setEditingId(null); setView('manage'); }}>
              <span className="admin-action-icon"><Pencil size={23} /></span><span className="admin-action-label">ORGANIZE</span><strong>Manage existing content</strong><span className="admin-action-description">Edit details, update publishing status, or remove items from the public site.</span><span className="admin-action-link">Review your content <ArrowRight size={17} /></span>
            </button>
          </div>
          <div className="admin-landing-bottom"><div><span className="admin-eyebrow">Your content sections</span><div className="admin-section-pills">{sections.map(({ id, label, Icon }) => <span key={id}><Icon size={15} />{label}<b>{managedContent[id].length}</b></span>)}</div></div><div className="admin-public-links"><span className="admin-eyebrow">Preview public pages</span>{publicPages.map((page) => <Link key={page.href} href={page.href}>{page.label}<ArrowRight size={13} /></Link>)}</div></div>
          <section className="admin-activity-panel"><div><p className="admin-eyebrow">Audit trail</p><h3>Recent admin activity</h3></div>{activity.length ? activity.map((entry, index) => <article key={`${entry.createdAt}-${index}`}><span>{entry.action}</span><strong>{entry.title}</strong><small>{entry.section} · {new Date(entry.createdAt).toLocaleString()}</small></article>) : <p>Activity will appear here after you make changes.</p>}</section>
          <section className="admin-activity-panel"><div><p className="admin-eyebrow">Member submissions</p><h3>Contact messages and prayer requests</h3><p>Recent user submissions are saved to the database and visible only in this signed-in admin area.</p></div>{!submissions.available ? <p>Submissions are unavailable until the database connection is working.</p> : <><div className="admin-inbox-columns"><div><h4>Contact messages ({submissions.contacts.length})</h4>{submissions.contacts.length ? submissions.contacts.map((entry, index) => <article key={`${entry.createdAt}-${index}`}><strong>{entry.subject} · {entry.name}</strong><small>{entry.email} · {new Date(entry.createdAt).toLocaleString()}</small><p>{entry.message}</p></article>) : <p>No contact messages yet.</p>}</div><div><h4>Prayer requests ({submissions.prayers.length})</h4>{submissions.prayers.length ? submissions.prayers.map((entry, index) => <article key={`${entry.createdAt}-${index}`}><strong>{entry.name}{entry.isPrivate ? ' · Private' : ''}</strong><small>{new Date(entry.createdAt).toLocaleString()}</small><p>{entry.request}</p></article>) : <p>No prayer requests yet.</p>}</div></div></>}</section>
          <section className="admin-activity-panel"><div><p className="admin-eyebrow">Cloudinary library</p><h3>Unused images ({unusedImages.length})</h3><p>Only images with no references in any active or trashed content are listed here.</p></div>{unusedImages.length ? <div className="admin-unused-images">{unusedImages.map((asset) => <UnusedImageForm key={asset.publicId} asset={asset} />)}</div> : <p>No unused images found, or Cloudinary could not be reached.</p>}</section>
        </div>
      ) : (
        <>
      <div className="admin-view-toolbar"><button type="button" className="admin-back-button" onClick={() => { setView('landing'); setEditingId(null); }}><ArrowLeft size={17} /> Dashboard</button><div><p className="admin-eyebrow">{view === 'add' ? 'Create something new' : 'Content library'}</p><h2>{view === 'add' ? 'Add content to your website' : 'Manage website content'}</h2><p>{view === 'add' ? 'Choose a section below. The form will only show fields for that type of content.' : 'Select a section to edit, update, or remove what is already on your site.'}</p></div><span className="admin-view-badge">{view === 'add' ? <><Plus size={15} /> ADD</> : <><Pencil size={15} /> MANAGE</>}</span></div>
      {!databaseConfigured && <p className="admin-storage-note" role="status">Add <code>DATABASE_URL</code> to <code>.env</code> before publishing content.</p>}
      {databaseConfigured && !databaseAvailable && <p className="admin-storage-note admin-database-warning" role="alert">Neon is not responding right now, so saved content could not load. Check your connection and refresh this page.</p>}
      {!mediaConfigured && <p className="admin-storage-note" role="status">Photo uploads are stored in Cloudinary. Set CLOUDINARY_URL in .env to enable uploads.</p>}
      <div className="admin-content-workspace">
        <aside className="admin-section-panel">
          <p className="admin-section-panel-label">{view === 'add' ? 'ADD TO A SECTION' : 'CHOOSE CONTENT TYPE'}</p>
          <nav className="admin-section-nav" aria-label="Website sections">
            {sections.map(({ id, label, description, Icon }) => (
              <button
                key={id}
                type="button"
                className={activeSection === id ? 'active' : ''}
                aria-pressed={activeSection === id}
                onClick={() => setActiveSection(id)}
              >
                <span className="admin-section-icon"><Icon size={19} strokeWidth={1.8} /></span>
                <span className="admin-section-copy"><strong>{label}</strong><small>{description}</small></span>
                <span className="admin-section-arrow" aria-hidden="true">›</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="admin-editor-column">
          <div className="admin-editor-heading">
            <div className="admin-editor-icon"><selectedSection.Icon size={22} strokeWidth={1.8} /></div>
            <div><p className="admin-eyebrow">{view === 'add' ? `Adding to ${selectedSection.label}` : `Managing ${selectedSection.label}`}</p><p className="admin-editor-description">{view === 'add' ? selectedSection.description : 'Choose an item below to edit its details or remove it from your website.'}</p></div>
          </div>
          <div className="admin-manage-grid">
        {view === 'add' && <>
        {activeSection === 'updates' && <section className="admin-panel" id="new-update"><p className="admin-eyebrow">Church news and activities</p><h3>New update</h3>
          <ContentForm action={createChurchUpdateAction} button="Publish update">
            <label htmlFor="update-title">Title</label><input id="update-title" name="title" required minLength={3} placeholder="Community outreach at Ayedire" />
            <label htmlFor="update-date">Date</label><input id="update-date" name="publishedAt" type="date" />
            <label htmlFor="update-summary">Short summary</label><input id="update-summary" name="summary" required minLength={10} />
            <label htmlFor="update-content">What happened?</label><textarea id="update-content" name="content" rows={5} required minLength={20} />
            <PhotoField id="update-image" />
            <label htmlFor="update-publish-at">Schedule for <span>(optional)</span></label><input id="update-publish-at" name="publishAt" type="datetime-local" />
            <label className="admin-checkbox"><input name="isPublished" type="checkbox" defaultChecked /> Publish</label>
          </ContentForm>
        </section>}

        {activeSection === 'sermons' && <section className="admin-panel" id="new-sermon"><p className="admin-eyebrow">Messages and teaching</p><h3>New sermon</h3>
          <ContentForm action={createSermonAction} button="Add sermon">
            <label htmlFor="sermon-title">Sermon title</label><input id="sermon-title" name="title" required />
            <label htmlFor="sermon-speaker">Speaker</label><input id="sermon-speaker" name="speaker" required />
            <label htmlFor="sermon-date">Date preached</label><input id="sermon-date" name="date" type="date" />
            <label htmlFor="sermon-series">Series <span>(optional)</span></label><input id="sermon-series" name="series" />
            <label htmlFor="sermon-description">Description</label><textarea id="sermon-description" name="description" rows={3} required />
            <label htmlFor="sermon-video">Video link <span>(optional)</span></label><input id="sermon-video" name="videoUrl" type="url" />
            <label htmlFor="sermon-audio">Audio link <span>(optional)</span></label><input id="sermon-audio" name="audioUrl" type="url" />
            <label>Schedule for <span>(optional)</span></label><input name="publishAt" type="datetime-local" />
            <label className="admin-checkbox"><input name="isPublished" type="checkbox" defaultChecked /> Publish</label>
          </ContentForm>
        </section>}

        {activeSection === 'programs' && <section className="admin-panel" id="new-event"><p className="admin-eyebrow">Church timetable</p><h3>New program or event</h3>
          <ContentForm action={createEventAction} button="Add to programs">
            <label htmlFor="event-title">Program name</label><input id="event-title" name="title" required />
            <label htmlFor="event-category">Program type</label><select id="event-category" name="category" defaultValue="WEEKLY"><option value="WEEKLY">Weekly</option><option value="MONTHLY">Monthly</option></select>
            <label htmlFor="event-day">Day or frequency</label><input id="event-day" name="dayOrFrequency" required placeholder="Every Wednesday" />
            <label htmlFor="event-time">Time</label><input id="event-time" name="time" required placeholder="5:00 PM" />
            <label htmlFor="event-description">Description <span>(optional)</span></label><textarea id="event-description" name="description" rows={3} />
            <label>Event date <span>(optional)</span></label><input name="eventDate" type="date" />
            <label>Status</label><select name="status" defaultValue="UPCOMING"><option value="UPCOMING">Upcoming</option><option value="PAST">Past</option><option value="CANCELLED">Cancelled</option></select>
            <label className="admin-checkbox"><input name="isFeatured" type="checkbox" /> Feature this event</label>
            <label>Schedule publication <span>(optional)</span></label><input name="publishAt" type="datetime-local" />
            <label className="admin-checkbox"><input name="isPublished" type="checkbox" defaultChecked /> Publish</label>
          </ContentForm>
        </section>}

        {activeSection === 'gallery' && <section className="admin-panel" id="new-photo"><p className="admin-eyebrow">Church moments</p><h3>Add photos to the gallery</h3>
          <ContentForm action={createGalleryImageAction} button="Add photos to gallery">
            <label htmlFor="gallery-images">Choose photos from your device</label><input id="gallery-images" name="images" type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple required onChange={(event) => setGalleryFileNames(Array.from(event.currentTarget.files ?? []).map((file) => file.name))} />
            <small>Select up to 5 photos at once. JPEG, PNG, WebP or AVIF; up to 8 MB each. Shared details below will be applied to every photo.</small>
            {galleryFileNames.length > 0 && <p className="admin-selected-files" role="status">{galleryFileNames.length} selected: {galleryFileNames.join(', ')}</p>}
            <label htmlFor="gallery-title">Photo title</label><input id="gallery-title" name="title" required />
            <label htmlFor="gallery-category">Category</label><select id="gallery-category" name="category" defaultValue="EVENTS"><option value="EVENTS">Events</option><option value="PROGRAMS">Programs</option><option value="OUTREACH">Outreach</option><option value="WORSHIP">Worship</option></select>
            <label htmlFor="gallery-description">Description</label><textarea id="gallery-description" name="description" rows={3} required />
            <label htmlFor="gallery-date">Date</label><input id="gallery-date" name="date" type="date" />
            <label htmlFor="gallery-location">Location</label><input id="gallery-location" name="location" placeholder="Ogbomosho" />
            <label className="admin-checkbox"><input name="featured" type="checkbox" /> Feature this photo</label>
            <label>Schedule publication <span>(optional)</span></label><input name="publishAt" type="datetime-local" />
            <label className="admin-checkbox"><input name="isPublished" type="checkbox" defaultChecked /> Publish</label>
          </ContentForm>
        </section>}

        {activeSection === 'leadership' && <section className="admin-panel" id="new-leader"><p className="admin-eyebrow">Our ministry team</p><h3>New leader or team member</h3>
          <ContentForm action={createTeamMemberAction} button="Add team member">
            <label htmlFor="leader-name">Name</label><input id="leader-name" name="name" required />
            <label htmlFor="leader-role">Role</label><input id="leader-role" name="role" required />
            <label htmlFor="leader-description">Introduction</label><textarea id="leader-description" name="description" rows={4} required />
            <PhotoField id="leader-image" />
            <label>Schedule publication <span>(optional)</span></label><input name="publishAt" type="datetime-local" />
            <label className="admin-checkbox"><input name="isPublished" type="checkbox" defaultChecked /> Publish</label>
          </ContentForm>
        </section>}

        {activeSection === 'testimonials' && <section className="admin-panel" id="new-testimony"><p className="admin-eyebrow">Stories of faith</p><h3>New testimony</h3>
          <ContentForm action={createTestimonialAction} button="Publish testimony">
            <label htmlFor="testimony-name">Name</label><input id="testimony-name" name="name" required />
            <label htmlFor="testimony-role">Location or role <span>(optional)</span></label><input id="testimony-role" name="locationOrRole" />
            <label htmlFor="testimony-category">Category</label><select id="testimony-category" name="category"><option>Healing</option><option>Deliverance</option><option>Provision</option><option>Salvation</option><option>Other</option></select>
            <label htmlFor="testimony-title">Title</label><input id="testimony-title" name="title" required />
            <label htmlFor="testimony-story">Testimony</label><textarea id="testimony-story" name="story" rows={5} required minLength={15} />
            <label htmlFor="testimony-scripture">Scripture <span>(optional)</span></label><input id="testimony-scripture" name="scripture" />
            <label>Schedule for <span>(optional)</span></label><input name="publishAt" type="datetime-local" />
            <label className="admin-checkbox"><input name="isApproved" type="checkbox" defaultChecked /> Show publicly</label>
          </ContentForm>
        </section>}
        </>}
          </div>

          {view === 'manage' && <>
          {editingItem && <div className="admin-edit-wrap"><EditContentForm item={editingItem} section={activeSection} /><button type="button" className="admin-cancel-edit" onClick={() => setEditingId(null)}>Close editor</button></div>}
          <section className="admin-managed-entries" aria-labelledby="managed-entries-heading">
            <div className="admin-managed-heading">
              <div><p className="admin-eyebrow">Saved to your website</p><h4 id="managed-entries-heading">Current {selectedSection.label.toLowerCase()}</h4></div>
              <div className="admin-list-filters"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${selectedSection.label.toLowerCase()}`} aria-label="Search content" /><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by status"><option value="ALL">All statuses</option><option>Published</option><option>Draft</option><option>Scheduled</option><option>UPCOMING</option><option>PAST</option><option>CANCELLED</option><option>Trash</option></select><span className="admin-managed-count">{visibleEntries.length}</span></div>
            </div>
            {visibleEntries.length === 0 ? (
              <p className="admin-managed-empty">Nothing added here yet. New items you publish will appear in this list.</p>
            ) : (
              <div className="admin-managed-list">
                {visibleEntries.map((item) => (
                  <article className="admin-managed-item" key={item.id}>
                    <div className="admin-managed-item-copy">
                      <h5>{item.title}</h5>
                      <p>{item.detail}</p>
                    </div>
                    <div className="admin-managed-item-actions">
                      {item.status && <span className={item.status === 'Published' ? 'admin-status admin-status-live' : 'admin-status'}>{item.status}</span>}
                      <button type="button" className="admin-edit-button" onClick={() => setPreviewId(item.id)}>Preview</button>
                      {activeSection === 'gallery' && <div className="admin-order-controls"><GalleryOrderForm item={item} direction="up" /><GalleryOrderForm item={item} direction="down" /></div>}
                      {item.status === 'Trash' ? <RestoreEntryForm item={item} section={activeSection} /> : <><button type="button" className="admin-edit-button" onClick={() => setEditingId(editingId === item.id ? null : item.id)} aria-label={`Edit ${item.title}`}><Pencil size={15} /> Edit</button><RemoveEntryForm item={item} section={activeSection} action={removeActions[activeSection]} /></>}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
          </>}
        </div>
      </div>
      {previewItem && <div className="admin-preview-backdrop" role="presentation" onClick={() => setPreviewId(null)}><section className="admin-preview-dialog" role="dialog" aria-modal="true" aria-label={`Preview ${previewItem.title}`} onClick={(event) => event.stopPropagation()}><button type="button" className="admin-preview-close" onClick={() => setPreviewId(null)} aria-label="Close preview">×</button><p className="admin-eyebrow">Website preview · {selectedSection.label}</p><h2>{previewItem.title}</h2><p className="admin-preview-detail">{previewItem.detail}</p>{previewItem.fields.imageUrl && <img src={previewItem.fields.imageUrl} alt={previewItem.title} />}{Object.entries(previewItem.fields).filter(([key, value]) => value && !['imageUrl','isPublished','isApproved','featured','isFeatured','publishAt','sortOrder'].includes(key)).map(([key, value]) => <p key={key}><strong>{key.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)}:</strong> {value}</p>)}<span className="admin-status">{previewItem.status ?? 'Published'}</span></section></div>}
        </>
      )}

    </section>
  );
}
