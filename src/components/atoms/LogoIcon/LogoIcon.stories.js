import { DarkBodyDecorator } from '@/stories/decorators'
import LogoIcon from './LogoIcon.vue'

export default {
  title: 'Components/Atoms/LogoIcon',
  decorators: [DarkBodyDecorator],
}

const Template = (args, { argTypes }) => ({
  components: { LogoIcon },
  props: Object.keys(argTypes),
  template: `<LogoIcon v-bind="$props" />`
})

/**
 * default
 */
export const LogoIconDefault = Template.bind({})

LogoIconDefault.parameters = { 
  layout: 'fullscreen', // centered | fullscreen | padded (:default)
  controls: { hideNoControlsWarning: true },
}

LogoIconDefault.args = {}

/**
 * collapsed
 */
export const LogoIconCollapsed = Template.bind({})

LogoIconCollapsed.parameters = {
  ...LogoIconDefault.parameters,
}

LogoIconCollapsed.args = {
  collapsed: true,
}