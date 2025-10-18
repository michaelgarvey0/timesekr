import { ChangelogFeed } from '~/components/ChangelogFeed';
import { Header } from '~/components/Header';
import { Hero } from '~/components/Hero';
import { PageContainer } from '~/components/PageContainer';

const FIRST_HTML_CHANGELOG = `
<h3>New Event Types</h3>
<p>We've added support for a series of new event types, offered on all plans.</p>
<ul>
  <li>Webinars</li>
  <li>Workshops</li>
  <li>Conferences</li>
</ul>
<h3>Improved Event Management</h3>
<p>Managing your events is now easier than ever with our new event management dashboard. You can now view all your events in one place, filter by type, and quickly access event details.</p>
`;

const SECOND_HTML_CHANGELOG = `
<h3>⌘+K Launcher</h3>
<p>Our new keyboard shortcut, ⌘ + K, allows you to quickly navigate to any page in your account. Press ⌘ + K, start typing, and select the page you want to visit or an action you want to perform.</p>
<img src="/cmdk.png" alt="CMD + K launcher" />
<h3>Billing Settings & Invoices</h3>
<p>Update your billing settings and view invoices directly from your account dashboard. You can now manage your payment methods, view past invoices, and download PDF copies for your records.</p>
`;

export function Changelog() {
  return (
    <PageContainer>
      <Header />
      <Hero
        decorative="What's new"
        title="Changelog"
        subtitle="Recent changes to UI Foundations Kit and its SaaS starter components, theme, and docs"
      />
      <ChangelogFeed
        entries={[
          {
            date: '2023-10-15',
            content: SECOND_HTML_CHANGELOG,
          },
          {
            date: '2023-10-01',
            content: FIRST_HTML_CHANGELOG,
          },
        ]}
      />
    </PageContainer>
  );
}
