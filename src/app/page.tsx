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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation currentStep={currentStep} setCurrentStep={setCurrentStep} />
      {renderCurrentStep()}
    </main>
  )
}
