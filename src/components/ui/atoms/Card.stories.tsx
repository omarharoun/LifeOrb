import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'UI/Atoms/Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Card>

export const Elevated: Story = { args: { children: 'Elevated card', variant: 'elevated' } }
export const Outline: Story = { args: { children: 'Outline card', variant: 'outline' } }
export const Ghost: Story = { args: { children: 'Ghost card', variant: 'ghost' } }
