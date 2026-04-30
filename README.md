# MacroDesk AI Platform (Natural Gas Analytics)

This repository contains the MacroDesk AI Platform, a unified analytics suite for Natural Gas reporting and ontology exploration. It is built as a **monorepo** containing both a web dashboard and a cross-platform mobile application.

## Project Structure

The repository utilizes NPM Workspaces to manage multiple applications and a shared intelligence layer:

- `apps/web/` (`@ng-analytics/web`): A modern, responsive Vite + React web application. Features a dark-mode dashboard for the Natural Gas Reports catalog and the Ontology Explorer.
- `apps/mobile/` (`@ng-analytics/mobile`): A React Native mobile application built with Expo Router. Brings the platform's intelligence catalog natively to iOS and Android.
- `packages/shared/` (`@ng-analytics/shared`): The central data repository containing the EIA reports catalog and the cross-domain knowledge graph mappings. Both web and mobile apps consume this exact same data.

## Getting Started

Follow these steps to set up the project locally.

### 1. Installation
Install all dependencies across the entire workspace from the root directory:
```bash
npm install
```

### 2. Run the Web App
To start the Vite development server for the web dashboard:
```bash
npm run dev:web
```
The app will typically be available at [http://localhost:5173/](http://localhost:5173/) or `5174`.

### 3. Run the Mobile App (Expo Go)
To start the React Native mobile application, you will use the Expo framework:
```bash
npm run dev:mobile
```
**Testing on your iPhone / Android:**
1. Download the free **Expo Go** app from the Apple App Store or Google Play Store on your physical device.
2. Once the `dev:mobile` server starts, a large QR code will appear in your terminal.
3. Open your phone's camera, scan the QR code, and tap the notification.
4. The Expo Go app will automatically open and instantly load the live mobile app! Every time you save a file in `apps/mobile/`, your phone will hot-reload.

### 4. Run Storybook (Web UI Components)
To launch Storybook and view the web UI components in isolation:
```bash
npm run storybook
```
Storybook will automatically open in your browser at [http://localhost:6006/](http://localhost:6006/).
