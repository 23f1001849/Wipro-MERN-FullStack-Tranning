Mock Practice Assessment – Front-End & Database Integration
===========================================================

How to Run
----------
1. User Story 1: open userstory1/index.html in any modern browser.
2. User Story 2: serve userstory2/ over HTTP (for example `npx serve userstory2` or VS Code Live Server) so the Fetch API can load mock-events.json without CORS issues, then open index.html.
3. User Story 1 (bonus integration):
   - Install backend dependencies in `bonus/`: `npm install`
   - `.env` set `MONGODB_URI` to your MongoDB connection string (include credentials). If your URI does not end with `/Eventia`, also set `MONGODB_DB=Eventia`.
   - Start the API: `npm start`
   - Open userstory1/index.html via a local server (Live Server works) so the Fetch API can reach `http://localhost:4000/api/registrations`.
4. User Story 3: run TypeScript compilation from the repo root:
   - Install dependencies if you need TypeScript locally: npm install -g typescript
   - Compile: npx tsc userstory3/CustomerModule.ts --experimentalDecorators --target ES2017 --module commonjs --outDir userstory3
   - The repository already includes the compiled file userstory3/CustomerModule.js for quick reference.



Testing Tips
------------
- Validate the User Story 1 form by submitting without filling the required fields to see Bootstrap validation styles.
- In the dashboard, change category/date filters and trigger the "Simulate Live Update" button to ensure DOM updates happen without a page reload.
