## BookVerse · Day 13 “Add & Manage”

The SPA now layers Flux state management and form tooling on top of the Day 12 routing work so admins can expand the library without leaving the app.

### Feature Highlights
- **Flux architecture**: `BookProvider` wires a dispatcher, `BookStore`, and action creators (see `src/flux`). Components subscribe once and react to store emissions.
- **Dependency Injection**: `BookProvider` accepts a `service` prop, letting tests (or future adapters) swap out the data source without touching the store.
- **Formik + Yup**: `/add-book` hosts a validated admin form that POSTs to the json-server backend via Flux actions.
- **SPA routing + transitions**: React Router 6 routes (`/home`, `/book/:id`, `/add-book`) swap with CSSTransition fades so navigation never reloads the page.

### Flux Lifecycle (Component Data Flow)
1. UI triggers an action (initial load, add book, manual refresh).
2. The action creator performs the async work through the injected `bookService`, then dispatches success/failure payloads.
3. `BookStore` updates internal state and notifies listeners.
4. `BookProvider` listens once, updates React state, and provides `{books, isLoading, isSaving, error, actions}` to any component via `useBookContext`.
5. Components such as `HomePage`, `BookList`, and `AddBookPage` re-render automatically—no manual prop drilling.

### Quick Start
```pwsh
npm install
npm run server   # http://localhost:5000/books (json-server)
npm start        # http://localhost:3000 (React SPA)
```

Keep the backend running (or set `REACT_APP_BOOKS_API`) so Flux actions can fetch and persist data.

### Adding Books via the Admin Form
1. Visit `/add-book` (or click “+ Add a New Book” on the home page).
2. Fill at least Title, Author, and Price—Formik + Yup enforce validation.
3. Submit to dispatch `BOOK_ADD_*` actions; on success the store prepends the new book and routes back to `/home` without a reload.

### Testing
```pwsh
npm test
```
The suite injects a mock `bookService` into `BookProvider` to exercise the Flux pipeline.

### Available Scripts
- `npm start` – launch the React app.
- `npm test` – run Jest once (or omit flags for watch mode).
- `npm run build` – create an optimized production bundle.
- `npm run server` – boot the local `json-server` backend reading from `books.json`.
- `npm run eject` – CRA escape hatch (irreversible).

### Project Structure Notes
- `src/pages` now includes `AddBookPage` for the Formik admin experience plus the existing routed pages.
- `src/api/booksApi.js` + `src/services/bookService.js` wrap backend I/O and normalization.
- `src/flux` hosts the dispatcher, store, and action creators powering the Flux loop.
- `src/context/BookContext.js` exposes `useBookContext`, handling dependency injection and store subscriptions for all consumers.
