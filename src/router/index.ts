import Vue from 'vue'
import { Routes } from './keys'
import VueRouter, { RouteConfig } from 'vue-router'
import i18n, { updateLocaleMessages } from '@/i18n'
import store from '@/store'
import gsap from 'gsap'

Vue.use(VueRouter)

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: `/${i18n.locale}`
  },
  {
    path: '/:lang/',
    name: Routes.LANDING,
    component: () => import(/* webpackChunkName: "landing" */ '../pages/Landing.vue'),
  },
  {
    path: '/:lang/floors',
    name: Routes.FLOORS,
    component: () => import(/* webpackChunkName: "floors" */ '../pages/Floors.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return new Promise(resolve => {
      gsap.to(window, { 
        onComplete: () => resolve({ x: 0, y: 0 }),
        ease: 'power2.inOut',
        scrollTo: 0,
        duration: 1,
      })
    })
    /* return new Promise(resolve => {
      gsap.delayedCall(0, () => {
        resolve({ x: 0, y: 0 })
      })
    }) */
  }
})

router.beforeEach(async (to, from, next) => {
  await updateLocaleMessages(to.params.lang)
  await store.dispatch('floors/changeFloor', -1)
  
  if (Routes.FLOORS === to.name) {
    await store.dispatch('app/hideLanding')
    await store.dispatch('app/start')
    await store.dispatch('app/shop')
  }
  
  next()
})

export default router