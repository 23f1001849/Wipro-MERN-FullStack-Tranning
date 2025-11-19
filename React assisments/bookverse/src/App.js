import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import { BookProvider } from './context/BookContext';
import BookDetailsPage from './pages/BookDetailsPage';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import AdvancedConceptsPage from './pages/AdvancedConceptsPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300} unmountOnExit>
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/advanced" element={<AdvancedConceptsPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App({ bookServiceOverride }) {
  return (
    <div className="App">
      <BookProvider service={bookServiceOverride}>
        <AnimatedRoutes />
      </BookProvider>
    </div>
  );
}

App.defaultProps = {
  bookServiceOverride: undefined,
};

export default App;
