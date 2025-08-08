import * as React from 'react'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: 'default' | 'primary' | 'danger'
  rounded?: 'md' | 'full'
  size?: 'sm' | 'md' | 'lg'
}

const toneMap = {
  default: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const roundedMap = {
  md: 'rounded-md',
  full: 'rounded-full',
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ tone = 'default', rounded = 'full', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={[
        'inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
        toneMap[tone],
        roundedMap[rounded],
        sizeMap[size],
        className || '',
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
)
IconButton.displayName = 'IconButton'

export default IconButton
