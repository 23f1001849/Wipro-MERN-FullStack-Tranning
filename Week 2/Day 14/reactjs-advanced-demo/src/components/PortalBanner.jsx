import { createPortal } from 'react-dom';

export default function PortalBanner() {
  const portalRoot = document.getElementById('modal-root');
  if (!portalRoot) return null;
  return createPortal(
    <div className="portal-banner">Portal renders outside of parent DOM hierarchy.</div>,
    portalRoot
  );
}
