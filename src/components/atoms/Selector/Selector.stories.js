import { DarkBodyDecorator } from '@/stories/decorators'
import Selector from './Selector.vue'

export default {
  title: 'Components/Atoms/Selector',
  decorators: [() => ({ template: `<div style="max-width: 60px;"><story /></div>` }), DarkBodyDecorator],
}

const Template = (args, { argTypes }) => ({
  components: { Selector },
  props: Object.keys(argTypes),
  template: `<Selector v-bind="$props" />`
})

export const SelectorDefault = Template.bind({})

SelectorDefault.parameters = { layout: 'fullscreen' } // centered | fullscreen | padded (:default)

SelectorDefault.storyName = 'Selector'

SelectorDefault.args = {
  selected: 'it',
  options: [
    'it',
    'en',
    'de',
    'fr',
    'es',
  ]
}