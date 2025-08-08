import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, id, ...props }, ref) => {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={[
            'w-full px-4 py-3 rounded-lg outline-none transition-all',
            'border',
            error ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            className || '',
          ].join(' ')}
          {...props}
        />
        {(hint || error) && (
          <p className={`mt-1 text-xs ${error ? 'text-red-600' : 'text-gray-500'}`}>{error ?? hint}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export default Input
