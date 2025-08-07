# LifeOrb - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
LifeOrb is a revolutionary web platform that helps people organize their lives through:
- Anonymous data collection and life parameter input
- AI-powered scenario simulation for life planning
- Social networking to connect people with similar goals
- Human-to-human collaboration for achieving shared objectives

## Technical Stack
- **Frontend**: Next.js 14 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion for smooth interactions
- **State Management**: React hooks with Zustand for complex state
- **API**: Next.js API routes for backend functionality

## Code Style Guidelines
- Use TypeScript for all new files
- Follow React functional component patterns with hooks
- Use Tailwind CSS classes, prefer utility-first approach
- Implement responsive design (mobile-first)
- Use meaningful component and variable names
- Keep components focused and reusable

## Key Features to Remember
1. **Anonymous by Design**: No personal data collection, no email requirements
2. **Life Parameters**: Age, education, career satisfaction, financial status, health, relationships
3. **Goal Categories**: Career goals, personal goals, values, lifestyle preferences
4. **AI Simulation**: Generate scenarios based on user parameters
5. **Social Matching**: Connect users with similar paths and goals
6. **Community Features**: Groups, discussions, peer support

## Design Principles
- Clean, modern interface with gradient orb theme
- Accessibility-first design
- Progressive disclosure of information
- Smooth animations and transitions
- Mobile-responsive layouts

## API Patterns
- Use Next.js API routes in `/src/app/api/`
- Follow RESTful conventions
- Handle errors gracefully
- Return consistent JSON responses
- Implement proper TypeScript typing
