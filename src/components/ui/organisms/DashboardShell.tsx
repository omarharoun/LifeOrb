import * as React from 'react'
import Link from 'next/link'
import { HomeIcon, Squares2X2Icon, UserIcon } from '@heroicons/react/24/outline'
import { AppHeader } from '../molecules/AppHeader'
import { BottomTabBar } from '../molecules/BottomTabBar'

export interface DashboardShellProps {
  sidebar?: React.ReactNode
  children: React.ReactNode
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ sidebar, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-orb-50">
      <AppHeader />
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 px-4 sm:px-6 lg:px-8 py-6">
        <aside className="hidden lg:block">
          {sidebar ?? (
            <nav className="sticky top-20 space-y-1">
              <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/60">
                <HomeIcon className="h-5 w-5" /> <span>Overview</span>
              </Link>
              <Link href="/explore" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/60">
                <Squares2X2Icon className="h-5 w-5" /> <span>Explore</span>
              </Link>
              <Link href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/60">
                <UserIcon className="h-5 w-5" /> <span>Profile</span>
              </Link>
            </nav>
          )}
        </aside>
        <main>{children}</main>
      </div>
      <BottomTabBar />
    </div>
  )
}

export default DashboardShell
