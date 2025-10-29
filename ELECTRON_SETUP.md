# Desktop Application Setup

Your antivirus app is now configured as an Electron desktop application! 

## Required Package.json Scripts

Add these scripts to your `package.json` file:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "electron:dev": "concurrently \"npm run dev\" \"wait-on http://localhost:8080 && NODE_ENV=development electron electron/main.js\"",
  "electron:build": "npm run build && electron-builder",
  "electron:build:win": "npm run build && electron-builder --win",
  "electron:build:mac": "npm run build && electron-builder --mac",
  "electron:build:linux": "npm run build && electron-builder --linux"
}
```

## Development

Run the desktop app in development mode:
```bash
npm run electron:dev
```

## Building for Distribution

Build for all platforms:
```bash
npm run electron:build
```

Build for specific platforms:
```bash
npm run electron:build:win    # Windows
npm run electron:build:mac    # macOS
npm run electron:build:linux  # Linux
```

The built applications will be in the `dist-electron` folder.

## Features

- ✅ Native desktop application for Windows, macOS, and Linux
- ✅ Full antivirus functionality with real-time protection
- ✅ System tray integration ready
- ✅ Auto-updates ready (configure in electron-builder.json)
- ✅ Native notifications support

## Note

The app maintains all its cloud functionality through Lovable Cloud while running as a native desktop application.
