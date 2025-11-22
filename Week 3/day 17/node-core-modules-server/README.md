# Day 17 · Core Modules Demo

HTTP server that showcases `fs`, `path`, `https`, and custom `EventEmitter` usage.

## Run

```bash
npm run dev
```

## Routes

- `/fs?file=notes` – reads text from `data/notes.txt` with `fs/promises`.
- `/path` – shows how `path.join`, `path.parse`, and `path.resolve` behave.
- `/events` – triggers a custom event and returns how many pings fired.
- `/https` – fetches a public placeholder API using Node’s `https` module.
