# Space Radio

An interactive, scroll-driven 3D product story for the Chronos Collection. The experience presents a luxury chronograph through animated chapters, technical callouts, and a real-time Three.js scene.

## Requirements

- Node.js 20.9 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Routes

- `/` — Scroll-driven Chronos product story
- `/collection` — Collection page

## Controls

- Scroll to move between story chapters.
- Use the chapter navigation or number keys `1`–`7` to jump to a chapter.
- Use `J`/`ArrowDown` for the next chapter and `K`/`ArrowUp` for the previous chapter.
- Audio feedback is muted by default and can be enabled in the experience.

3D model assets are stored in [`public/models`](./public/models).
