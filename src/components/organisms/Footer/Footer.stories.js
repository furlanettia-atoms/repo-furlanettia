import Footer from './Footer.vue'

export default {
  title: 'Components/Organisms/Footer',
}

const Template = (args, { argTypes }) => ({
  components: { Footer },
  props: Object.keys(argTypes),
  template: `<Footer v-bind="$props" />`
})

export const FooterDefault = Template.bind({})

FooterDefault.parameters = { 
  layout: 'fullscreen', // centered | fullscreen | padded (:default)
  controls: { hideNoControlsWarning: true },
}

FooterDefault.storyName = 'Footer'

FooterDefault.args = {}