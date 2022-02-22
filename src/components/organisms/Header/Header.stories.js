import { DarkBodyDecorator } from '@/stories/decorators'
import Header from './Header.vue'

export default {
  title: 'Components/Organisms/Header',
  decorators: [DarkBodyDecorator],
}

const Template = (args, { argTypes }) => ({
  components: { Header },
  props: Object.keys(argTypes),
  template: `<Header v-bind="$props" />`,
  async mounted () {
    await this.$store.dispatch('app/start')
  }
})

export const HeaderDefault = Template.bind({})

HeaderDefault.parameters = { 
  layout: 'fullscreen', // centered | fullscreen | padded (:default)
  controls: { hideNoControlsWarning: true },
}

HeaderDefault.storyName = 'Header'

HeaderDefault.args = {}