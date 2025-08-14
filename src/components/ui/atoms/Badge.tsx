import * as React from 'react'

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'neutral'

const variants: Record<BadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-800',
  neutral: 'bg-gray-100 text-gray-700',
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', className, ...props }) => (
  <span
    className={[
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
      variants[variant],
      className || '',
    ].join(' ')}
    {...props}
  />
)

export default Badge
