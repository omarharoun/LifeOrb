import type { Meta, StoryObj } from '@storybook/react'
import { DashboardShell } from './DashboardShell'
import { StatCard } from '../molecules/StatCard'

const meta: Meta<typeof DashboardShell> = {
  title: 'UI/Organisms/DashboardShell',
  component: DashboardShell,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof DashboardShell>

export const Default: Story = {
  render: () => (
    <DashboardShell>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Focus Score" value={82} trend="up" hint="+4 this week" />
        <StatCard label="Habits" value={5} trend="neutral" />
        <StatCard label="Connections" value={12} trend="up" />
      </div>
    </DashboardShell>
  ),
}
