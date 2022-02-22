import { DarkBodyDecorator } from '@/stories/decorators'
import HambIcon from './HambIcon.vue'

export default {
  title: 'Components/Atoms/HambIcon',
  decorators: [DarkBodyDecorator],
}

const Template = (args, { argTypes }) => ({
  components: { HambIcon },
  props: Object.keys(argTypes),
  template: `<HambIcon v-bind="$props" />`
})

export const HambIconDefault = Template.bind({})

HambIconDefault.parameters = { 
  layout: 'fullscreen', // centered | fullscreen | padded (:default)
  controls: { hideNoControlsWarning: true },
}

HambIconDefault.storyName = 'HambIcon'

HambIconDefault.args = {}