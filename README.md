# Shield Spark Guardian 🛡️

**SecureGuard Pro** - Advanced Security Suite for Real-time Threat Protection

A comprehensive desktop security application built with modern web technologies, providing real-time threat detection, system monitoring, and advanced protection features.

## 🌟 Features

### Core Security Features
- **Real-time Threat Protection** - Continuous monitoring and blocking of threats
- **Advanced File Scanner** - Deep system scanning with threat detection
- **Quarantine Manager** - Safe isolation and management of detected threats
- **Firewall Integration** - Network-level protection against unauthorized access
- **Web Protection** - Malicious website blocking and safe browsing
- **System Health Monitoring** - Real-time system performance and security metrics

### User Interface
- **Modern Dashboard** - Clean, intuitive interface with real-time status updates
- **Live Statistics** - Threats blocked, files scanned, system health metrics
- **Security Score** - Comprehensive security rating system
- **Recent Scan History** - Track and review all scanning activities
- **Responsive Design** - Works seamlessly across different screen sizes

### Desktop Integration
- **Cross-platform Support** - Windows, macOS, and Linux compatibility
- **System Tray Integration** - Minimized background operation
- **Native Notifications** - Real-time threat alerts and scan completion notices
- **Auto-updates** - Automatic security definition and application updates

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/uday68/shield-spark-guardian.git
   cd shield-spark-guardian
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Desktop Application

To run as a desktop application:

```bash
# Development mode
npm run electron:dev

# Build for distribution
npm run electron:build

# Platform-specific builds
npm run electron:build:win    # Windows
npm run electron:build:mac    # macOS  
npm run electron:build:linux  # Linux
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icon library

### Desktop
- **Electron** - Cross-platform desktop app framework
- **Electron Builder** - Application packaging and distribution

### Backend & Database
- **Supabase** - Backend-as-a-Service with real-time capabilities
- **PostgreSQL** - Robust relational database
- **Real-time Subscriptions** - Live updates for threat monitoring

### State Management & Data
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling and validation
- **Zod** - Runtime type validation

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing and optimization

## 📁 Project Structure

```
shield-spark-guardian/
├── src/
│   ├── components/
│   │   ├── dashboard/        # Dashboard components
│   │   ├── quarantine/       # Quarantine management
│   │   ├── scan/            # Threat scanning components
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # Third-party integrations
│   ├── lib/                 # Utility functions
│   └── pages/               # Route components
├── electron/                # Electron main and preload scripts
├── supabase/               # Database migrations and functions
└── public/                 # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run electron:dev` - Start desktop app in development
- `npm run electron:build` - Build desktop application

## 🛡️ Security Features Details

### Threat Detection Engine
- Pattern-based malware detection
- Behavioral analysis for zero-day threats
- Cloud-powered threat intelligence
- Real-time virus definition updates

### Protection Modules
- **File System Monitor** - Real-time file access monitoring
- **Network Guard** - Incoming/outgoing connection filtering
- **Process Monitor** - Suspicious process detection and termination
- **Registry Protection** - Windows registry modification prevention

### Quarantine System
- Safe isolation of detected threats
- Encrypted threat storage
- Restoration capabilities for false positives
- Automatic cleanup of old quarantined items

## 🌐 Cloud Integration

The application integrates with Supabase for:
- **Real-time threat updates** - Live threat intelligence feeds
- **Scan history synchronization** - Cross-device scan history
- **Security analytics** - Threat statistics and reporting
- **Remote configuration** - Cloud-based security policy management

## 📱 Platform Support

### Desktop Platforms
- **Windows 10/11** (x64, ARM64)
- **macOS 10.14+** (Intel, Apple Silicon)
- **Linux** (Ubuntu 18.04+, AppImage, Debian, RPM)

### Web Platform
- **Modern browsers** with WebAssembly support
- **Progressive Web App** capabilities
- **Offline functionality** for core features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](https://github.com/uday68/shield-spark-guardian/wiki)
- **Issues**: [GitHub Issues](https://github.com/uday68/shield-spark-guardian/issues)
- **Discussions**: [GitHub Discussions](https://github.com/uday68/shield-spark-guardian/discussions)

## 🏆 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered development platform
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Backend powered by [Supabase](https://supabase.com/)

---

**⚡ SecureGuard Pro © 2025 - Your trusted security partner**