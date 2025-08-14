import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Type here...', label: 'Label' },
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const Hint: Story = { args: { hint: 'Helpful hint' } }
export const Error: Story = { args: { error: 'Something went wrong' } }
