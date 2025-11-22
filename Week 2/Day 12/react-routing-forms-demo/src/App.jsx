import { Link, Route, Routes, useLocation } from 'react-router-dom';
import TransitionPage from './components/TransitionPage.jsx';
import HOCShowcase from './components/HOCShowcase.jsx';
import RenderPropDemo from './components/RenderPropDemo.jsx';
import FormikDemo from './components/FormikDemo.jsx';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <aside>
        <h2>Day 12 Menu</h2>
        <nav>
          <Link to="/">Router Basics</Link>
          <Link to="/transitions">Transition Concepts</Link>
          <Link to="/hoc">HOC & Render Props</Link>
          <Link to="/form">Formik + Yup</Link>
        </nav>
      </aside>
      <main>
        <h1>Routing, Transitions, HOCs, Render Props, Forms</h1>
        <p>Below routes animate in/out using a basic CSS transition keyed by pathname: {location.pathname}</p>
        <div key={location.pathname} className="route-wrapper">
          <Routes location={location}>
            <Route path="/" element={<RouterBasics />} />
            <Route path="/transitions" element={<TransitionPage />} />
            <Route path="/hoc" element={<HOCShowcase />} />
            <Route path="/form" element={<FormikDemo />} />
          </Routes>
        </div>
        <RenderPropDemo />
      </main>
    </div>
  );
}

function RouterBasics() {
  return (
    <article>
      <h2>React Router</h2>
      <ul>
        <li>Routes declaratively map a pathname to a UI tree.</li>
        <li>useNavigate, useParams, useLocation expose imperative helpers when required.</li>
        <li>Nested routes share layouts and fetch data via loaders in RR v6.4+.</li>
      </ul>
    </article>
  );
}
