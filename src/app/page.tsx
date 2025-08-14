'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import LifeParametersForm from '@/components/LifeParametersForm'
import ScenarioSimulation from '@/components/ScenarioSimulation'
import SocialNetwork from '@/components/SocialNetwork'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [currentStep, setCurrentStep] = useState('welcome')
  const [userProfile, setUserProfile] = useState(null)

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <Hero onGetStarted={() => setCurrentStep('parameters')} />
      case 'parameters':
        return (
          <LifeParametersForm 
            onComplete={(profile) => {
              setUserProfile(profile)
              setCurrentStep('simulation')
            }}
          />
        )
      case 'simulation':
        return (
          <ScenarioSimulation 
            userProfile={userProfile}
            onContinue={() => setCurrentStep('social')}
          />
        )
      case 'social':
        return <SocialNetwork userProfile={userProfile} />
      default:
        return <Hero onGetStarted={() => setCurrentStep('parameters')} />
    }
  }

  return (
    <main className="min-h-screen comfort-gradient relative overflow-hidden">
      {/* Floating orb decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-400/20 to-orb-400/20 rounded-full blur-xl animate-drift"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-sage-400/20 to-warm-400/20 rounded-full blur-lg animate-float"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-orb-300/15 to-primary-300/15 rounded-full blur-2xl animate-breathe"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-warm-400/20 to-sage-400/20 rounded-full blur-lg animate-drift"></div>
      </div>
      
      <Navigation currentStep={currentStep} setCurrentStep={setCurrentStep} />
      {renderCurrentStep()}
    </main>
  )
}
