import { DarkBodyDecorator } from '@/stories/decorators'
import Cookie from './Cookie.vue'

export default {
  title: 'Components/Organisms/Cookie',
  decorators: [DarkBodyDecorator],
}

const Template = (args, { argTypes }) => ({
  components: { Cookie },
  props: Object.keys(argTypes),
  template: `<Cookie v-bind="$props" />`
})

export const CookieDefault = Template.bind({})

CookieDefault.parameters = { 
  layout: 'fullscreen', // centered | fullscreen | padded (:default)
  controls: { hideNoControlsWarning: true },
}
CookieDefault.storyName = 'Cookie'

CookieDefault.args = {}