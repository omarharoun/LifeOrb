import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

const meta: Meta<typeof StatCard> = {
  title: 'UI/Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: { label: 'Daily Streak', value: 7, hint: 'Keep it up!' },
}
export default meta

type Story = StoryObj<typeof StatCard>

export const Neutral: Story = {}
export const Up: Story = { args: { trend: 'up' } }
export const Down: Story = { args: { trend: 'down' } }
