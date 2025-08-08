import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Badge' },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Primary: Story = { args: { variant: 'primary' } }
export const Success: Story = { args: { variant: 'success' } }
export const Warning: Story = { args: { variant: 'warning' } }
export const Neutral: Story = { args: { variant: 'neutral' } }
