import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './IconButton'
import { HeartIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof IconButton> = {
  title: 'UI/Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { children: <HeartIcon className="h-6 w-6" aria-hidden /> },
}
export default meta

type Story = StoryObj<typeof IconButton>

export const Default: Story = {}
export const Primary: Story = { args: { tone: 'primary' } }
export const Danger: Story = { args: { tone: 'danger' } }
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton><HeartIcon className="h-5 w-5" /></IconButton>
      <IconButton size="lg"><HeartIcon className="h-6 w-6" /></IconButton>
    </div>
  ),
}
