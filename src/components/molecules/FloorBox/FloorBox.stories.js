import { LightBodyDecorator } from '@/stories/decorators'
import FloorBox from './FloorBox.vue'

export default {
  title: 'Components/Molecules/FloorBox',
  decorators: [LightBodyDecorator, () => ({ template: `<div style="max-width: 1000px;"><story /></div>` })],
}

const Template = (args, { argTypes }) => ({
  components: { FloorBox },
  props: Object.keys(argTypes),
  template: `<FloorBox v-bind="$props" data-intersect-active />`
})

export const FloorBoxDefault = Template.bind({})

FloorBoxDefault.parameters = { layout: 'fullscreen' } // centered | fullscreen | padded (:default)

FloorBoxDefault.storyName = 'FloorBox'

FloorBoxDefault.args = {
  index: 0,
}