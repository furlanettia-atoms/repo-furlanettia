import Menu from './Menu.vue'

export default {
  title: 'Components/Organisms/Menu',
}

const Template = (args, { argTypes }) => ({
  components: { Menu },
  props: Object.keys(argTypes),
  template: `<Menu v-bind="$props" />`
})

export const MenuDefault = Template.bind({})

MenuDefault.parameters = { 
  layout: 'fullscreen', // centered | fullscreen | padded (:default)
  controls: { hideNoControlsWarning: true },
}

MenuDefault.storyName = 'Menu'

MenuDefault.args = {}