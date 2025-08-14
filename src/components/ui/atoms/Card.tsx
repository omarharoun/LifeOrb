import * as React from 'react'

export type CardVariant = 'elevated' | 'outline' | 'ghost'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  clickable?: boolean
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export const Card: React.FC<CardProps> = (props) => {
  const { variant = 'elevated', clickable, className, ...rest } = props
  const variantClass: Record<CardVariant, string> = {
    elevated: 'bg-white rounded-xl shadow-lg border border-gray-100',
    outline: 'bg-white rounded-xl border border-gray-200',
    ghost: 'bg-transparent rounded-xl',
  }

  return (
    <div
      className={cx(
        'p-6',
        variantClass[variant as CardVariant],
        clickable ? 'transition-shadow hover:shadow-xl cursor-pointer' : '',
        className,
      )}
      {...rest}
    />
  )
}

export default Card
