import * as React from 'react'
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { IconButton } from '../atoms/IconButton'

export interface AppHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  onMenuClick?: () => void
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title = 'LifeOrb', onMenuClick, className, ...rest }) => {
  return (
    <header className={[
      'sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100',
      className || '',
    ].join(' ')} {...rest}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconButton aria-label="Menu" onClick={onMenuClick} className="lg:hidden">
            <Bars3Icon className="h-6 w-6" />
          </IconButton>
          <Link href="/" className="font-extrabold tracking-tight text-lg bg-gradient-to-r from-primary-600 to-orb-600 text-transparent bg-clip-text">
            {title}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <IconButton aria-label="Notifications">
            <BellIcon className="h-6 w-6" />
          </IconButton>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
