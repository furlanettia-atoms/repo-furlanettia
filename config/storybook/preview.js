import '@/gsap'
import '@/plugins'
import '@/scss/index.scss'
import { themes } from '@storybook/theming'
import { AppDecorator } from '@/stories/decorators'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
  options: {
    storySort: {
      order: ['Example', 'Components', ['Atoms', 'Molecules', 'Organisms']],
    },
  },
}

export const decorators = [
  AppDecorator,
]