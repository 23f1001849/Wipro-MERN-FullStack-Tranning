# JSX & JavaScript Concepts Sprint

A small React + TypeScript playground that showcases core JavaScript concepts (hoisting, constructors) and array helpers (`filter`, `map`, `forEach`) while rendering an interactive list of numbers.

## Features
- Extend the dataset on the fly, restore the seed set, or add randomly generated examples.
- Rich array operation controls (map, filter, slice, Set, sort) that log a transformation timeline.
- Console logger illustrating `Array.forEach`, `Array.reduce`, `Array.every`, and `Array.some`.
- Stats dashboard powered by `Array.reduce`, `Array.filter`, and `Array.sort`.
- Hoisting demo with function declarations, `var` hoisting, and the temporal dead zone.
- Constructor demo using a `NumberCollection` class to encapsulate calculations.
- Strong typing through the `NumberItem` interface.

## Getting Started
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open the provided URL (defaults to `http://localhost:5173`) to explore the sprint.

## Project Structure
```
Week 1/Day 6/JSX_JS_Concepts_Sprint/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── types.ts
    └── components/
        ├── ConstructorDemo.tsx
    ├── AddNumberForm.tsx
    ├── FilterControls.tsx
        ├── HoistingDemo.tsx
        ├── Logger.tsx
    ├── NumberList.tsx
    ├── StatsPanel.tsx
    └── TransformationHistory.tsx
```
