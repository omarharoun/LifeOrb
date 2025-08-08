import type { Meta, StoryObj } from '@storybook/react'
import { BottomTabBar } from './BottomTabBar'

const meta: Meta<typeof BottomTabBar> = {
  title: 'UI/Molecules/BottomTabBar',
  component: BottomTabBar,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof BottomTabBar>

export const Default: Story = {}
