import { DarkBodyDecorator } from '@/stories/decorators'
import PrimaryButton from './PrimaryButton.vue'

export default {
  title: 'Components/Atoms/PrimaryButton',
  decorators: [DarkBodyDecorator],
  argTypes: {
    fontSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { PrimaryButton },
  props: Object.keys(argTypes),
  template: `<PrimaryButton v-bind="$props" />`
})

/**
 * default
 */
export const PrimaryButtonDefault = Template.bind({})

PrimaryButtonDefault.parameters = { layout: 'fullscreen' } // centered | fullscreen | padded (:default)

PrimaryButtonDefault.args = {
  label: 'Vivi l’esperienza Xmas'
}

/**
 * with icon
 */
export const PrimaryButtonWithIcon = Template.bind({})

PrimaryButtonWithIcon.parameters = {
  ...PrimaryButtonDefault.parameters,
}

PrimaryButtonWithIcon.args = {
  label: 'Vedi la selezione',
  fontSize: 'sm',
  withIcon: true,
  asLink: false,
}