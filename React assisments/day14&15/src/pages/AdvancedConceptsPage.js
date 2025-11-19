import React, { lazy, Suspense, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import ErrorBoundary from '../components/ErrorBoundary';
import ProductCard from '../components/ProductCard';
import PortalModal from '../components/PortalModal';
import ThemeToggle from '../components/ThemeToggle';
import WorkoutTracker from '../components/WorkoutTracker';
import PwaInstallPrompt from '../components/PwaInstallPrompt';
import ProductAdminPanel from '../components/ProductAdminPanel';
import { useTheme } from '../context/ThemeContext';
import './AdvancedConceptsPage.css';

const CourseDetails = lazy(() => import('../components/learning/CourseDetails'));
const InstructorProfile = lazy(() => import('../components/learning/InstructorProfile'));

const LazyLoader = ({ label }) => (
  <div className="lazy-loader">
    <div className="spinner-border text-info" role="status">
      <span className="visually-hidden">Loading module...</span>
    </div>
    <p className="text-info mt-2 mb-0">{label}</p>
  </div>
);

const AdvancedConceptsPage = () => {
  const { theme } = useTheme();
  const [modules, setModules] = useState({ course: false, instructor: false });
  const [stats, setStats] = useState([
    { id: 1, title: 'Active Learners', value: 1280, lastUpdated: new Date().toLocaleTimeString() },
    { id: 2, title: 'Completion Rate', value: '86%', lastUpdated: new Date().toLocaleTimeString() },
    { id: 3, title: 'Weekly Sessions', value: 42, lastUpdated: new Date().toLocaleTimeString() },
  ]);
  const [isProductBroken, setIsProductBroken] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const product = useMemo(
    () => ({
      name: 'BookVerse Pro Pass',
      price: 49,
      features: ['Unlimited cohorts', 'Priority instructor feedback', 'Analytics API'],
    }),
    []
  );

  const toggleModule = (key) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const simulateUpdate = () => {
    setStats((prev) => {
      const index = Math.floor(Math.random() * prev.length);
      return prev.map((stat, idx) =>
        idx === index
          ? {
              ...stat,
              value: typeof stat.value === 'number' ? stat.value + 1 : `${parseInt(stat.value, 10) + 1}%`,
              lastUpdated: new Date().toLocaleTimeString(),
            }
          : stat
      );
    });
  };

  const closeModal = () => setModalOpen(false);

  const heroTextClass = theme === 'dark' ? 'text-white' : 'text-dark';
  const heroMutedClass = theme === 'dark' ? 'text-white-50' : 'text-muted';
  const outlineButton = theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark';

  return (
    <section className="route-fade advanced-page">
      <div className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-5 hero-header">
          <div>
            <p className={`text-uppercase ${heroMutedClass} mb-1`}>Day 15 · React Hooks & State Management</p>
            <h1 className={`display-6 fw-semibold mb-2 ${heroTextClass}`}>Performance, State & Reach</h1>
            <p className={`${heroMutedClass} mb-0`}>
              Lazy loading, pure components, error boundaries, portals, global theming, advanced hooks, Redux Toolkit, and
              a production-ready PWA.
            </p>
          </div>
          <div className="d-flex gap-2 flex-wrap justify-content-end">
            <ThemeToggle />
            <Link to="/home" className={`btn ${outlineButton}`}>
              ← Back to Library
            </Link>
            <button type="button" className="btn btn-warning" onClick={() => setModalOpen(true)}>
              Launch Announcement
            </button>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="showcase-card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Challenge 1 · Lazy Loading Modules</h2>
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-info" onClick={() => toggleModule('course')}>
                    {modules.course ? 'Hide' : 'View'} Course Details
                  </button>
                  <button type="button" className="btn btn-outline-info" onClick={() => toggleModule('instructor')}>
                    {modules.instructor ? 'Hide' : 'View'} Instructor Profile
                  </button>
                </div>
              </div>
              <Suspense fallback={<LazyLoader label="Loading selected module..." />}>
                <div className="module-stack">
                  {modules.course && <CourseDetails />}
                  {modules.instructor && <InstructorProfile />}
                  {!modules.course && !modules.instructor && (
                    <p className="text-muted mb-0">Select a module above to lazy load its contents.</p>
                  )}
                </div>
              </Suspense>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="showcase-card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Challenge 2 · Pure Stats Widgets</h2>
                <button type="button" className="btn btn-outline-primary" onClick={simulateUpdate}>
                  Simulate Update
                </button>
              </div>
              <div className="row g-3">
                {stats.map((stat) => (
                  <div key={stat.id} className="col-12 col-md-4">
                    <StatsCard title={stat.title} value={stat.value} lastUpdated={stat.lastUpdated} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="showcase-card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Challenge 3 · Error Boundary</h2>
                <button type="button" className="btn btn-outline-danger" onClick={() => setIsProductBroken((prev) => !prev)}>
                  {isProductBroken ? 'Recover Product Card' : 'Break Product Card'}
                </button>
              </div>
              <ErrorBoundary
                componentName="ProductCard"
                fallback={({ errorMessage, onRetry }) => (
                  <div className="alert alert-warning" role="alert">
                    <p className="fw-semibold mb-1">Fallback UI active</p>
                    <p className="mb-2">{errorMessage}</p>
                    <button type="button" className="btn btn-sm btn-outline-dark" onClick={onRetry}>
                      Reset card
                    </button>
                  </div>
                )}
              >
                <ProductCard product={product} shouldCrash={isProductBroken} />
              </ErrorBoundary>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="showcase-card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Challenge 4 · Portal Modal</h2>
                <button type="button" className={`btn ${outlineButton}`} onClick={() => setModalOpen(true)}>
                  Open Modal
                </button>
              </div>
              <p className="text-muted mb-0">
                The modal renders via React Portal so it floats above every layout layer, preserving z-index stacking and
                isolation from parent overflow.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="showcase-card theme-context-card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <p className="eyebrow mb-1">Challenge 5 · Context API</p>
                  <h2 className="h5 mb-0">Theme everywhere</h2>
                </div>
                <ThemeToggle />
              </div>
              <p className="text-muted mb-4">
                ThemeContext sits at the top of the tree so every component (cards, tracker, admin panel) switches palettes
                instantly—no prop drilling needed.
              </p>
              <div className="theme-swatches">
                <span className="theme-pill light">Light preview</span>
                <span className="theme-pill dark">Dark preview</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="showcase-card">
              <WorkoutTracker />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="showcase-card">
              <PwaInstallPrompt />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="showcase-card">
              <ProductAdminPanel />
            </div>
          </div>
        </div>
      </div>

      <PortalModal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="h4">Portal Announcement</h3>
        <p className="text-muted">
          This modal lives outside the root DOM hierarchy via <code>ReactDOM.createPortal</code>. It fades in/out using pure
          CSS transitions and closes on backdrop click or Escape.
        </p>
        <button type="button" className="btn btn-primary" onClick={closeModal}>
          Got it!
        </button>
      </PortalModal>
    </section>
  );
};

export default AdvancedConceptsPage;
