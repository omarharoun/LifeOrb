import * as React from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  ring?: boolean
}

const sizeMap: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-12 w-12 text-sm',
  xl: 'h-16 w-16 text-base',
}

function getInitials(name?: string) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts[1]?.[0] ?? ''
  return (first + last).toUpperCase()
}

export const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const { src, alt, name, size = 'md', ring = false, className, ...rest } = props
  const initials = React.useMemo(() => getInitials(name), [name])
  return (
    <div
      className={[
        'relative inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-600 overflow-hidden select-none',
        sizeMap[size],
        ring ? 'ring-2 ring-offset-2 ring-primary-500' : '',
        className || '',
      ].join(' ')}
      aria-label={alt || name}
      {...rest}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || name || 'avatar'} className="h-full w-full object-cover" />
      ) : (
        <span className="font-semibold">{initials}</span>
      )}
    </div>
  )
}

export default Avatar
