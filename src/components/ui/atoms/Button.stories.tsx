import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Atoms/Button',
  component: Button,
  args: { children: 'Click me' },
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Link: Story = { args: { variant: 'link' } }
export const Loading: Story = { args: { isLoading: true } }
export const FullWidth: Story = { args: { fullWidth: true } }
