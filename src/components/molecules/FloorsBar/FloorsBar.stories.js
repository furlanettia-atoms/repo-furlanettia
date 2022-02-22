import { DarkBodyDecorator } from '@/stories/decorators'
import FloorsBar from './FloorsBar.vue'

export default {
  title: 'Components/Molecules/FloorsBar',
  decorators: [DarkBodyDecorator],
}

const Template = (args, { argTypes }) => ({
  components: { FloorsBar },
  props: Object.keys(argTypes),
  template: `<FloorsBar v-bind="$props" />`
})

export const FloorsBarDefault = Template.bind({})

FloorsBarDefault.parameters = { layout: 'fullscreen' } // centered | fullscreen | padded (:default)

FloorsBarDefault.storyName = 'FloorsBar'

FloorsBarDefault.args = {
  currentIndex: 2,
}