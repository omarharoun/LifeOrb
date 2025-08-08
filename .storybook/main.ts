import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
  },
  stories: [
    '../src/**/*.stories.@(ts|tsx|mdx)',
    '../src/components/ui/**/*.stories.@(ts|tsx|mdx)',
    '../src/components/molecules/**/*.stories.@(ts|tsx|mdx)',
    '../src/components/organisms/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
  ],
  staticDirs: [],
  docs: { autodocs: 'tag' },
}
export default config