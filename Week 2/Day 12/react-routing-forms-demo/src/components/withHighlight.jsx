import React from 'react';

export default function withHighlight(Wrapped) {
  return function Highlighted(props) {
    return (
      <div className="highlight-wrapper">
        <Wrapped {...props} featured />
        <small>Injected prop featured={String(true)}</small>
      </div>
    );
  };
}
