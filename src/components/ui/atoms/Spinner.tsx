import * as React from 'react'

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-6 w-6 border-3',
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'sm', light, className, ...props }) => (
  <span
    className={[
      'inline-block rounded-full animate-spin border-t-transparent',
      sizeMap[size],
      light ? 'border-white' : 'border-gray-600',
      className || '',
    ].join(' ')}
    {...props}
  />
)

export default Spinner
