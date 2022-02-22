<template>
  <transition name="reveal">
    <div class="cookie">
      <div class="cookie__container">
        <div class="cookie__col">
          <p v-html="$t('cookies.text')" />
        </div>
        <div class="cookie__col">
          <button @click="onAccept">
            <span>{{ $t('cookies.agree') }}</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'

@Component
export default class Cookie extends Vue {
  @Emit('accept')
  onAccept () {
    return
  }
}
</script>

<style lang="scss" scoped>
.cookie {
  @include position(fixed, null 0 0 0);
  background-color: #F6F6F6;
  padding: 20px;
  z-index: 5;

  &__container {
    max-width: 280px;
    margin: 0 auto;

    @include media ($md-breakpoint) {
      justify-content: space-around;
      align-items: center;
      max-width: 1280px;
      display: flex;
    }
  }

  &__col {
    margin: 20px;
    max-width: 800px;
  }

  p {
    @include aktiv-grotesk-regular;
    margin: 0 auto 30px;
    color: #444444;

    @include media ($md-breakpoint) {
      margin: 0;
    }

    /deep/ a {
      color: #444444;
    }
  }

  button {
    @include size(100%, auto);
    @include aktiv-grotesk-regular;
    appearance: none;
    background: $black-color;
    transition: background-color .4s $ease-out-cubic;
    color: $white-color;
    text-transform: uppercase;
    letter-spacing: .1em;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 8px 40px;
    margin: 0;
    border: 0;

    &:hover {
      background: #444444;
    }
  }

  &.reveal-enter-active, &.reveal-leave-active {
    transition: transform .6s $ease-in-out-cubic;
  }

  &.reveal-enter, &.reveal-leave-to {
    transform: translate(0, 100%);
  }
}
</style>