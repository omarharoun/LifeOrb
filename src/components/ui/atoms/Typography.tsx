import * as React from 'react'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type TextVariant = 'body' | 'caption' | 'overline'
export type Weight = 'regular' | 'medium' | 'semibold' | 'bold'

const headingSize: Record<HeadingLevel, string> = {
  1: 'text-3xl md:text-4xl lg:text-5xl',
  2: 'text-2xl md:text-3xl lg:text-4xl',
  3: 'text-xl md:text-2xl lg:text-3xl',
  4: 'text-lg md:text-xl',
  5: 'text-base md:text-lg',
  6: 'text-sm md:text-base',
}

const weights: Record<Weight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  weight?: Weight
  gradient?: boolean
}

export const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  level = 2,
  weight = 'semibold',
  gradient,
  className,
  children,
  ...rest
}) => {
  const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements
  return (
    <Tag
      className={[
        headingSize[level],
        weights[weight],
        gradient ? 'bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-orb-500' : 'text-gray-900',
        className || '',
      ].join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant
  muted?: boolean
  weight?: Weight
}

const textSize: Record<TextVariant, string> = {
  body: 'text-sm md:text-base',
  caption: 'text-xs md:text-sm',
  overline: 'text-[11px] tracking-wider uppercase',
}

export const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  variant = 'body',
  muted,
  weight = 'regular',
  className,
  children,
  ...rest
}) => (
  <p
    className={[
      textSize[variant],
      weights[weight],
      muted ? 'text-gray-500' : 'text-gray-700',
      className || '',
    ].join(' ')}
    {...rest}
  >
    {children}
  </p>
)

export default { Heading, Text }
