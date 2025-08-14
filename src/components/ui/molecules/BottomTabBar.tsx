import * as React from 'react'
import { HomeIcon, Squares2X2Icon, PlayCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export interface TabItem {
  key: string
  label: string
  href: string
  icon: React.ReactNode
}

const defaultTabs: TabItem[] = [
  { key: 'home', label: 'Home', href: '/', icon: <HomeIcon className="h-6 w-6" /> },
  { key: 'explore', label: 'Explore', href: '/explore', icon: <Squares2X2Icon className="h-6 w-6" /> },
  { key: 'action', label: 'Act', href: '/action', icon: <PlayCircleIcon className="h-8 w-8" /> },
  { key: 'profile', label: 'Profile', href: '/profile', icon: <UserIcon className="h-6 w-6" /> },
]

export interface BottomTabBarProps {
  activeKey?: string
  tabs?: TabItem[]
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeKey = 'home', tabs = defaultTabs }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-t border-gray-200 lg:hidden">
      <ul className="flex items-center justify-around px-2 py-2">
        {tabs.map((t) => {
          const isActive = t.key === activeKey
          const isAction = t.key === 'action'
          return (
            <li key={t.key}>
              <Link
                className={[
                  'flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 text-xs',
                  isActive ? 'text-primary-600' : 'text-gray-600',
                ].join(' ')}
                href={t.href}
              >
                <span
                  className={[
                    'inline-flex items-center justify-center',
                    isAction ? 'h-12 w-12 rounded-full bg-gradient-to-r from-primary-500 to-orb-500 text-white shadow-lg -mt-8' : '',
                  ].join(' ')}
                >
                  {t.icon}
                </span>
                <span className="mt-0.5">{t.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BottomTabBar
