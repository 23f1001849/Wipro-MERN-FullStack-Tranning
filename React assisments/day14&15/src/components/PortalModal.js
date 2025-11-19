import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = () => document.getElementById('modal-root');

const PortalModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const root = modalRoot();
  if (!root) {
    return null;
  }

  const modalContent = (
    <div className="modal-overlay show" onClick={onClose}>
      <div className="modal-surface" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="btn-close float-end" aria-label="Close" onClick={onClose} />
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, root);
};

PortalModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

PortalModal.defaultProps = {
  isOpen: false,
};

export default PortalModal;
