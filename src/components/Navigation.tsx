'use client'

interface NavigationProps {
  currentStep: string
  setCurrentStep: (step: string) => void
}

export default function Navigation({ currentStep, setCurrentStep }: NavigationProps) {
  const steps = [
    { id: 'welcome', label: 'Welcome', icon: '🏠' },
    { id: 'parameters', label: 'Parameters', icon: '⚙️' },
    { id: 'simulation', label: 'Scenarios', icon: '🔮' },
    { id: 'social', label: 'Community', icon: '🤝' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-orb-600 bg-clip-text text-transparent">
              LifeOrb
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : isCompleted
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{step.icon}</span>
                  <span className="font-medium">{step.label}</span>
                  {isCompleted && <span className="ml-2 text-green-500">✓</span>}
                </button>
              )
            })}
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <span>💡</span>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <span>❓</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
