import * as React from 'react'

export interface StepperProps {
  steps: string[]
  currentIndex: number
  className?: string
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentIndex, className }) => {
  const progress = ((currentIndex + 1) / steps.length) * 100
  return (
    <div className={className}>
      <div className="flex justify-between mb-2">
        {steps.map((title, i) => (
          <span
            key={title}
            className={`text-xs sm:text-sm ${i <= currentIndex ? 'text-primary-600' : 'text-gray-400'}`}
          >
            {title}
          </span>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary-500 to-orb-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default Stepper
