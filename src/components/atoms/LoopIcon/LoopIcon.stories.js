import { DarkBodyDecorator } from '@/stories/decorators'
import LoopIcon from './LoopIcon.vue'

export default {
  title: 'Components/Atoms/Icons/LoopIcon',
  decorators: [DarkBodyDecorator],
  argTypes: {
    radius: {
      control: { type: 'range', min: 44, max: 300, step: 1 }
    },
    width: {
      control: { type: 'range', min: .1, max: 10, step: .1 }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { LoopIcon },
  props: Object.keys(argTypes),
  template: `<LoopIcon v-bind="$props" />`
})

export const LoopIconDefault = Template.bind({})

LoopIconDefault.parameters = { layout: 'fullscreen' } // centered | fullscreen | padded (:default)

LoopIconDefault.storyName = 'LoopIcon'

LoopIconDefault.args = {
  radius: 44,
  width: 2,
}