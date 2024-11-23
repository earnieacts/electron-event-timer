# Electron React Timer

A customizable desktop timer application built with Electron and React, featuring both simple countdown and event-based timing modes.

## Features

- Simple countdown timer mode
- Event-based timer mode with rounds and intervals
- Cross-platform window controls (macOS and Windows)
- Dark/Light/System theme support
- Frameless window design
- Customizable time settings

## Tech Stack

- Electron
- React
- TypeScript
- Vite
- Tailwind CSS
- Material Icons

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/electron-react-timer.git
cd electron-react-timer
```

2. Install dependencies:

```bash
npm install
```
or
```bash
yarn install
```

## Development

To run the app in development mode:

```bash
npm run dev
```
or

```bash
yarn dev
```

This will:
- Start the Vite dev server
- Launch the Electron application
- Enable hot reload for both React and Electron processes

## Building

To create a production build:


The built application will be available in the `dist` directory.

## Project Structure

```
electron-react-timer/
├── electron/ # Electron main process files
├── src/
│ ├── components/ # React components
│ ├── contexts/ # React contexts
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page components
│ ├── routes/ # Route definitions
│ └── types/ # TypeScript type definitions
├── public/ # Static assets
└── build/ # Production build output
```


## Scripts

- `dev`: Start Vite development server
- `build`: Build the React application
- `preview`: Preview the built application
- `electron:dev`: Start the application in development mode
- `electron:build`: Build the application for production
- `lint`: Run ESLint
- `lint:fix`: Fix ESLint issues
- `format`: Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


