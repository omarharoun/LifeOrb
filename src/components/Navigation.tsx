'use client'

interface NavigationProps {
  currentStep: string
  setCurrentStep: (step: string) => void
}

export default function Navigation({ currentStep, setCurrentStep }: NavigationProps) {
  const steps = [
    { id: 'welcome', label: 'Welcome', icon: '�' },
    { id: 'parameters', label: 'Journey', icon: '🌱' },
    { id: 'simulation', label: 'Explore', icon: '✨' },
    { id: 'social', label: 'Connect', icon: '🤝' },
  ]

  return (
    <nav className="glass-card border-0 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="text-3xl font-bold heading-comfort mr-2">
              LifeOrb
            </div>
            <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-orb-500 rounded-full animate-pulse-slow"></div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center px-6 py-3 rounded-2xl transition-all duration-300 font-medium ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-orb-500 text-white shadow-lg transform scale-105'
                      : isCompleted
                      ? 'text-sage-600 hover:bg-sage-50/80 backdrop-blur-sm'
                      : 'text-comfort/70 hover:bg-white/50 backdrop-blur-sm hover:text-comfort'
                  }`}
                >
                  <span className="mr-3 text-lg">{step.icon}</span>
                  <span>{step.label}</span>
                  {isCompleted && <span className="ml-3 text-sage-500">✓</span>}
                </button>
              )
            })}
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-3 rounded-full bg-white/50 backdrop-blur-sm text-comfort hover:bg-white/70 transition-all duration-300 hover:scale-110">
              <span className="text-xl">💡</span>
            </button>
            <button className="p-3 rounded-full bg-white/50 backdrop-blur-sm text-comfort hover:bg-white/70 transition-all duration-300 hover:scale-110">
              <span className="text-xl">💬</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
