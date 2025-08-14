import * as React from 'react'
import { Spinner } from './Spinner'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  loadingText?: string
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-gradient-to-r from-primary-500 to-orb-500 text-white hover:from-primary-600 hover:to-orb-600 focus-visible:ring-primary-500',
  secondary: 'bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-400',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-300',
  link: 'bg-transparent text-primary-600 hover:text-primary-700 underline underline-offset-4 focus-visible:ring-primary-300',
}

const sizes: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props: React.PropsWithChildren<ButtonProps>) => {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth,
    leftIcon,
    rightIcon,
    isLoading,
    loadingText,
    className,
    children,
    disabled,
    ...rest
  } = props

  const computedDisabled = disabled || isLoading

  return (
    <button
      className={cx(base, variants[variant as Variant], sizes[size as Size], fullWidth ? 'w-full' : '', className)}
      aria-busy={isLoading || undefined}
      data-loading={isLoading ? 'true' : undefined}
      aria-live={isLoading ? 'polite' : undefined}
      disabled={computedDisabled}
      {...rest}
    >
      {isLoading && (
        <Spinner className="mr-2" size="sm" light aria-hidden="true" />
      )}
      {leftIcon && !isLoading && <span className="mr-2" aria-hidden="true">{leftIcon}</span>}
      <span>{isLoading && loadingText ? loadingText : children}</span>
      {rightIcon && !isLoading && <span className="ml-2" aria-hidden="true">{rightIcon}</span>}
    </button>
  )
}

export default Button
