<template>
  <div class="logo" :class="{ 'logo-collapsed': collapsed }">
    <img v-if="collapsed" src="@/assets/img/emporio-armani-eagle-logo.svg" alt="Emporio Armani" @click="onClick">
    <img v-else src="@/assets/img/emporio-armani-logo.svg" alt="Emporio Armani" @click="onClick">
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Logo extends Vue {
  @Prop()
  collapsed?: boolean

  @Emit('click')
  onClick () {
    return
  }
}
</script>

<style lang="scss" scoped>
.logo {
  max-width: 220px;

  img {
    @include size(100%, auto);
    display: block;
  }

  &-collapsed {
    max-width: 45px;

    @include media ($md-breakpoint) {
      max-width: 35px;
    }
  }
}
</style>