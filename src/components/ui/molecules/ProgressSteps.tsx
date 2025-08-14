import * as React from 'react'

export interface ProgressStepsProps {
  steps: { id: string; label: string }[]
  activeIndex?: number
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, activeIndex = 0 }) => {
  return (
    <ol className="flex items-center justify-between gap-2">
      {steps.map((s, i) => {
        const isActive = i <= activeIndex
        return (
          <li key={s.id} className="flex-1">
            <div className="flex items-center">
              <span
                className={[
                  'h-8 w-8 flex items-center justify-center rounded-full text-xs font-semibold',
                  isActive ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600',
                ].join(' ')}
              >
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className={['h-1 flex-1 mx-2 rounded', isActive ? 'bg-primary-200' : 'bg-gray-200'].join(' ')} />
              )}
            </div>
            <p className={[
              'mt-1 text-xs text-center',
              isActive ? 'text-primary-700' : 'text-gray-600',
            ].join(' ')}>{s.label}</p>
          </li>
        )
      })}
    </ol>
  )
}

export default ProgressSteps
