import { useState } from 'react';

function MouseProvider({ children }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  return (
    <div className="mouse-box" onMouseMove={(event) => setCoords({ x: event.clientX, y: event.clientY })}>
      {children(coords)}
    </div>
  );
}

export default function RenderPropDemo() {
  return (
    <section>
      <h2>Render Props</h2>
      <MouseProvider>{({ x, y }) => <p>Cursor: {x}, {y}</p>}</MouseProvider>
    </section>
  );
}
