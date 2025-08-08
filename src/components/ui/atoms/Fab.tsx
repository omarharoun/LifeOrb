import * as React from 'react'

export type FabSize = 'sm' | 'md' | 'lg'
export type FabVariant = 'primary' | 'secondary'

export interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FabSize
  variant?: FabVariant
  icon: React.ReactNode
  label?: string
  fixed?: boolean
}

const sizeMap: Record<FabSize, string> = {
  sm: 'h-10 w-10 text-base',
  md: 'h-14 w-14 text-lg',
  lg: 'h-16 w-16 text-xl',
}

const variantMap: Record<FabVariant, string> = {
  primary: 'bg-gradient-to-r from-primary-500 to-orb-500 text-white shadow-lg hover:from-primary-600 hover:to-orb-600',
  secondary: 'bg-white text-primary-600 shadow-lg border border-primary-100 hover:bg-primary-50',
}

export const Fab: React.FC<FabProps> = ({ size = 'md', variant = 'primary', icon, label, fixed, className, ...rest }) => {
  return (
    <button
      className={[
        'inline-flex items-center justify-center rounded-full transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500',
        sizeMap[size],
        variantMap[variant],
        fixed ? 'fixed bottom-6 right-6' : '',
        className || '',
      ].join(' ')}
      aria-label={label}
      {...rest}
    >
      {icon}
    </button>
  )
}

export default Fab
