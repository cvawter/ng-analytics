# ng-analytics

This repository contains tools and a React-based viewer for Natural Gas Analytics. It features a modern, responsive Vite + React web application to interactively view EIA Natural Gas reports, as well as a Storybook environment to develop and test components in isolation.

## Getting Started

Follow these steps to set up the project locally.

### 1. Installation
Install all project dependencies (including React, Vite, and Storybook) using npm:
```bash
npm install
```

### 2. Run the React App
To start the Vite development server and view the main application:
```bash
npm run dev
```
The app will typically be available at [http://localhost:5173/](http://localhost:5173/).

### 3. Run Storybook
To launch Storybook and view the UI components (such as the Reports table) in isolation:
```bash
npm run storybook
```
Storybook will automatically open in your browser at [http://localhost:6006/](http://localhost:6006/).

## Project Structure
- `ngreports.jsx`: The core React component that displays the Natural Gas reports catalog.
- `stories/`: Contains the Storybook stories (e.g., `ngreports.stories.jsx`).
- `main.jsx` & `index.html`: The entry points for the Vite React application.
