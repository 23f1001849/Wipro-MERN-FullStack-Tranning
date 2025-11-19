import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { store } from './store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register({
  onSuccess: () => console.info('Service worker installed: offline caching enabled.'),
  onUpdate: () => console.info('New content available; refresh to update.'),
});
