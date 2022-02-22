import { DarkBodyDecorator } from '@/stories/decorators'
import CloseIcon from './CloseIcon.vue'

export default {
  title: 'Components/Atoms/CloseIcon',
  decorators: [DarkBodyDecorator],
}

const Template = (args, { argTypes }) => ({
  components: { CloseIcon },
  props: Object.keys(argTypes),
  template: `<CloseIcon v-bind="$props" />`
})

export const CloseIconDefault = Template.bind({})

CloseIconDefault.parameters = { 
  layout: 'fullscreen', // centered | fullscreen | padded (:default)
  controls: { hideNoControlsWarning: true },
}

CloseIconDefault.storyName = 'CloseIcon'

CloseIconDefault.args = {}