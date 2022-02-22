//import { DarkBodyDecorator } from '@/stories/decorators'
import NavBar from './NavBar.vue'

export default {
  title: 'Components/Molecules/NavBar',
  //decorators: [DarkBodyDecorator],
}

const Template = (args, { argTypes }) => ({
  components: { NavBar },
  props: Object.keys(argTypes),
  template: `<NavBar v-bind="$props" />`
})

export const NavBarDefault = Template.bind({})

NavBarDefault.parameters = { 
  layout: 'fullscreen', // centered | fullscreen | padded (:default)
  controls: { hideNoControlsWarning: true },
}

NavBarDefault.storyName = 'NavBar'

NavBarDefault.args = {}