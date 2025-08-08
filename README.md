# LifeOrb 🔮

> Revolutionize Your Life Planning

LifeOrb is a revolutionary web platform that connects people on similar life paths, combines AI scenario simulation with human collaboration, and helps users achieve their goals through anonymous, community-driven support.

## ✨ Features

### 🎯 Anonymous Life Planning
- **No Personal Data Required**: No emails, no registration - completely anonymous
- **Life Parameter Input**: Define your current situation, goals, and values
- **Secure & Private**: Your data stays with you

### 🤖 AI-Powered Scenarios
- **Smart Simulation**: AI analyzes your parameters to generate personalized life scenarios
- **Probability Analysis**: See likelihood of different outcomes based on your choices
- **Action Plans**: Get specific steps to achieve your goals

### 🤝 Human-to-Human Connection
- **Path Matching**: Connect with others pursuing similar goals
- **Compatibility Scoring**: Find highly compatible collaborators
- **Peer Support**: Share experiences and learn from others' journeys

### 🌐 Social Communities
- **Goal-Oriented Groups**: Join communities focused on specific objectives
- **Knowledge Sharing**: Exchange insights, tips, and strategies
- **Collaborative Growth**: Achieve more together than alone

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd lifeorb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: React Hooks + Zustand
- **Database**: TBD (PostgreSQL/MongoDB planned)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Hero.tsx           # Landing page hero
│   ├── LifeParametersForm.tsx  # User input form
│   ├── ScenarioSimulation.tsx  # AI scenario display
│   ├── SocialNetwork.tsx  # Community features
│   └── Navigation.tsx     # Main navigation
└── types/                 # TypeScript type definitions
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Orb**: Purple gradient (#d946ef to #c026d3)
- **Background**: Soft gradients from blue to purple

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Gradient backgrounds, hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Progressive disclosure

## 🔄 Development Workflow

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Style
- Use TypeScript for all new files
- Follow React functional component patterns
- Prefer composition over inheritance
- Use Tailwind utility classes
- Implement responsive design

## 🌟 Key Concepts

### Anonymous Data Flow
1. User inputs life parameters (no personal info)
2. System generates anonymous profile hash
3. AI creates scenarios based on parameters
4. Matching algorithm finds compatible users
5. Community features facilitate collaboration

### AI Integration
- Scenario generation based on user parameters
- Probability calculations for different life paths
- Personalized action step recommendations
- Continuous learning from user interactions

### Social Features
- Goal-based matching algorithm
- Community creation and management
- Peer-to-peer messaging and collaboration
- Progress tracking and sharing

## 🔒 Privacy & Security

- **No Personal Data**: Email, name, address not required
- **Anonymous Profiles**: User identification through parameter hashing
- **Secure Communication**: End-to-end encryption for messages
- **Data Minimization**: Only collect necessary information

## 🎯 Roadmap

### Phase 1: Core Platform ✅
- [x] Anonymous user onboarding
- [x] Life parameter input system
- [x] Basic AI scenario generation
- [x] User matching algorithm
- [x] Community features

### Phase 2: Enhanced AI
- [ ] Advanced scenario modeling
- [ ] Machine learning improvements
- [ ] Predictive analytics
- [ ] Goal achievement tracking

### Phase 3: Mobile & Scaling
- [ ] Mobile app development
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Enterprise partnerships

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.lifeorb.app](https://docs.lifeorb.app)
- **Community**: Join our Discord server
- **Issues**: GitHub Issues for bug reports

---

**Built with ❤️ by the LifeOrb team**

*Revolutionizing life planning through human connection and AI collaboration*

---

## 🤖 AI Integration (OpenRouter + DeepSeek R1)

This app uses OpenRouter to access the DeepSeek R1 model for scenario generation.

Setup environment variables (locally or on Vercel):

- OPENROUTER_API_KEY — your OpenRouter API key
- NEXT_PUBLIC_SITE_URL — optional, used for attribution headers

Key files:

- `src/utils/openrouter.ts` — lightweight client calling `https://openrouter.ai/api/v1/chat/completions`
- `src/app/api/scenarios/route.ts` — API route that calls DeepSeek R1 and returns structured scenarios

Security notes:

- Do not expose your API key to the browser. Keep it server-side.
- Consider rate limits and costs; DeepSeek R1 has per-token pricing (see OpenRouter model page).
