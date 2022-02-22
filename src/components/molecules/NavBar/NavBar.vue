<template>
  <transition name="reveal" appear>
    <div class="nav-bar">
      <router-link :to="{ name: 'landing' }" custom v-slot="{ navigate }">
      <LogoIcon
        :collapsed="true"
        @click="navigate"
      />
      </router-link>
      <h1 class="name">
        <span>{{ $t('name').replace(' ', '') }}</span>
      </h1>
      <Selector
        :options="languages"
        :selected="currentLocale"
        @change="onChangeLocale"
      />
      <HambIcon 
        @click="onHambClick"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import LogoIcon from '@/components/atoms/LogoIcon/LogoIcon.vue'
import HambIcon from '@/components/atoms/HambIcon/HambIcon.vue'
import Selector from '@/components/atoms/Selector/Selector.vue'
import i18n, { availableLanguages } from '@/i18n'

@Component({
  components: {
    LogoIcon,
    HambIcon,
    Selector,
  }
})
export default class NavBar extends Vue {
  get currentLocale () {
    return i18n.locale
  }

  get languages () {
    const array = [...availableLanguages]
    array.splice(availableLanguages.indexOf(this.currentLocale), 1);
    return array 
  }

  @Emit('changeLang')
  onChangeLocale (value: string) {
    return value
  }

  @Emit('hambClick')
  onHambClick () {
    return
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  @include size(100%, $navbar-height-md);
  background-color: $black-color;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 20px;
  display: flex;

  @include media ($sm-breakpoint) {
    @include size(100%, $navbar-height-sm);
  }

  .name {
    @include acta-display-book;
    text-transform: uppercase;
    letter-spacing: .25rem;
    cursor: default;
    font-size: 2rem;
    display: none;

    @include media ($sm-breakpoint) {
      display: block;
    }
  }

  .selector {
    @include position(absolute, 50% 80px null null);
    transform: translate(0, -50%);

    @include media ($md-breakpoint) {
      @include position(absolute, 50% 90px null null);
    }
  }

  &.reveal-enter-active, &.reveal-leave-active {
    transition: transform .4s $ease-in-out-cubic 1s;
    transform: translate(0, 0);
  }

  &.reveal-enter, &.reveal-leave-to {
    transform: translate(0, -100%);
  }
}
</style>