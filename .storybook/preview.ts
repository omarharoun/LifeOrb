import type { Preview } from '@storybook/react'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'orb', value: 'linear-gradient(135deg,#f0f9ff,#fae8ff)' },
        { name: 'dark', value: '#0b1020' },
      ],
    },
    viewport: {
      viewports: {
        iphoneSE: {
          name: 'iPhone SE',
          styles: { width: '375px', height: '667px' },
        },
        iphone12: {
          name: 'iPhone 12',
          styles: { width: '390px', height: '844px' },
        },
        pixel5: {
          name: 'Pixel 5',
          styles: { width: '393px', height: '851px' },
        },
        ipad: {
          name: 'iPad',
          styles: { width: '810px', height: '1080px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
      },
      defaultViewport: 'iphone12',
    },
    a11y: {
      element: '#storybook-root',
      manual: false,
    },
  },
}

export default preview
