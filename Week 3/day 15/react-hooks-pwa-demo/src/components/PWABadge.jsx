export default function PWABadge() {
  return (
    <article className="card">
      <h3>Progressive Web App Checklist</h3>
      <ul>
        <li>Manifest + theme color for install prompt.</li>
        <li>Service worker caching shell for offline boot.</li>
        <li>Responsive layout + HTTPS.</li>
      </ul>
      <p>Run <code>npm run build && npm run preview</code> then inspect Lighthouse &gt; PWA to verify.</p>
    </article>
  );
}
