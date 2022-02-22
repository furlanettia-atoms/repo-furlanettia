import { LightBodyDecorator } from '@/stories/decorators'
import Tooltip from './Tooltip.vue'

export default {
  title: 'Components/Atoms/Tooltip',
  decorators: [LightBodyDecorator],
}

const Template = (args, { argTypes }) => ({
  components: { Tooltip },
  props: Object.keys(argTypes),
  template: `<Tooltip v-bind="$props" />`
})

export const TooltipDefault = Template.bind({})

TooltipDefault.parameters = { 
  layout: 'fullscreen', // centered | fullscreen | padded (:default)
  controls: { hideNoControlsWarning: true },
}

TooltipDefault.storyName = 'Tooltip'

TooltipDefault.args = {}