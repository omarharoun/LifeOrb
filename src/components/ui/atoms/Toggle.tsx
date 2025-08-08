import * as React from 'react'

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(({ label, className, ...props }, ref) => {
  const id = React.useId()
  return (
    <label htmlFor={id} className={["flex items-center gap-3 cursor-pointer select-none", className || ''].join(' ')}>
      <input id={id} ref={ref} type="checkbox" className="sr-only peer" {...props} />
      <span className="peer-checked:bg-primary-600 bg-gray-300 relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors">
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-all peer-checked:translate-x-5 shadow" />
      </span>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  )
})
Toggle.displayName = 'Toggle'

export default Toggle
