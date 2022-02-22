// @ts-nocheck
/* eslint-disable */
import { Module, VuexModule, Action } from 'vuex-module-decorators'

const GTMCustomEvent = {
  event: 'GAevent',
  eventCategory: 'ea_glow_town',
}

@Module({ namespaced: true })
export default class GtmModule extends VuexModule {
  @Action
  push ({ eventID, eventAction, eventLabel }) {
    /* console.log({
      ...GTMCustomEvent,
      eventAction,
      eventLabel,
      eventID,
    }) */
    dataLayer.push({
      ...GTMCustomEvent,
      eventAction,
      eventLabel,
      eventID,
    })
  }
}