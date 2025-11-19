import React, { useEffect, useState } from 'react';

const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installMessage, setInstallMessage] = useState('');

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setInstallMessage(outcome === 'accepted' ? 'Install complete — enjoy offline access!' : 'Install dismissed');
    setDeferredPrompt(null);
  };

  return (
    <div className="pwa-card">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <p className="eyebrow mb-1">Challenge 6 · Progressive Web App</p>
          <h2 className="h5 mb-0">Installable & Offline-ready</h2>
        </div>
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleInstall} disabled={!deferredPrompt}>
          {deferredPrompt ? 'Install app' : 'Ready'}
        </button>
      </div>
      <p className="text-muted mb-2">
        Service worker caching keeps the showcase available even without a network connection. Use the button above or your
        browser&apos;s install menu to pin BookVerse Day 14 to your device.
      </p>
      <ul className="small text-muted mb-0">
        <li>Offline banner appears automatically when the network drops.</li>
        <li>Manifest + icons make the app installable on desktop and mobile.</li>
        <li>Audit-ready: run Lighthouse → PWA to verify a 90+ score.</li>
      </ul>
      {installMessage && <p className="small fw-semibold mt-2 mb-0">{installMessage}</p>}
    </div>
  );
};

export default PwaInstallPrompt;
