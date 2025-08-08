import * as React from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, className, id, children, ...props }, ref) => {
  const generatedId = React.useId()
  const selectId = id ?? generatedId
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={[
            'w-full px-4 py-3 rounded-lg outline-none transition-all bg-white',
            'border',
            error ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            className || '',
          ].join(' ')}
          {...props}
        >
          {children}
        </select>
        {(hint || error) && (
          <p className={`mt-1 text-xs ${error ? 'text-red-600' : 'text-gray-500'}`}>{error ?? hint}</p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export default Select
