import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Life Orb' },
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}
export const Image: Story = { args: { src: 'https://i.pravatar.cc/100?img=3' } }
export const WithRing: Story = { args: { ring: true } }
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Life Orb" size="xs" />
      <Avatar name="Life Orb" size="sm" />
      <Avatar name="Life Orb" size="md" />
      <Avatar name="Life Orb" size="lg" />
      <Avatar name="Life Orb" size="xl" />
    </div>
  ),
}
