import { LightBodyDecorator } from '@/stories/decorators'
import BaseLink from './BaseLink.vue'

export default {
  title: 'Components/Atoms/BaseLink',
  decorators: [LightBodyDecorator],
}

const Template = (args, { argTypes }) => ({
  components: { BaseLink },
  props: Object.keys(argTypes),
  template: `<BaseLink v-bind="$props">{{$props.children}}</BaseLink>`
})

export const BaseLinkDefault = Template.bind({})

BaseLinkDefault.parameters = { layout: 'fullscreen' } // centered | fullscreen | padded (:default)

BaseLinkDefault.storyName = 'BaseLink'

BaseLinkDefault.args = {
  children: 'Scopri di più su Armani.com'
}