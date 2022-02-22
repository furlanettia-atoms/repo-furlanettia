import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'

export default () => ({ 
  template: `
    <story />
  `,
  router,
  store,
  i18n,
})