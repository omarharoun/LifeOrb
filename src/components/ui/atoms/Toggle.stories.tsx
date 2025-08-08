import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'UI/Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { label: 'Enable focus mode' },
}
export default meta

type Story = StoryObj<typeof Toggle>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
