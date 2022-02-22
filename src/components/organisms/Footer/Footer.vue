<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__socials">
        <h4>{{ $t('footer.follow') }}</h4>
        <ul>
          <li>
            <a :href="linksData.socials.fb" target="_blank" @click="gtmPush('facebook')" rel="noopener" title="facebook"  aria-label="facebook">
              <span class="icon" aria-hidden="true">
                <img src="@/assets/img/facebook-icon.svg" alt="facebook">
              </span>
            </a>
          </li>
          <li>
            <a :href="linksData.socials.tw" target="_blank" @click="gtmPush('twitter')" rel="noopener" title="twitter" aria-label="twitter">
              <span class="icon" aria-hidden="true">
                <img src="@/assets/img/twitter-icon.svg" alt="twitter">
              </span>
            </a>
          </li>
          <li>
            <a :href="linksData.socials.ig" target="_blank" @click="gtmPush('instagram')" rel="noopener" title="instagram" aria-label="instagram">
              <span class="icon" aria-hidden="true">
                <img src="@/assets/img/instagram-icon.svg" alt="instagram">
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer__links">
        <a :href="linksData.contactus" @click="gtmPush('contact_us')" target="_blank" rel="noopener">
          <span>{{ $t('footer.contactus') }}</span>
        </a>
        <a :href="linksData.storelocator" @click="gtmPush('store_locator')" target="_blank" rel="noopener">
          <span>{{ $t('footer.storelocator') }}</span>
        </a>
      </div>
      <div class="footer__copyright">
        <button @click="openModal($t(`footer.modal[${0}]`))">
          <span>{{ $t('footer.copyright[0]', { year: new Date().getFullYear() }) }}</span>
        </button>
        <button @click="openModal($t(`footer.modal[${1}]`))">
          <span>{{ $t('footer.copyright[1]') }}</span>
        </button>
      </div>
    </div>
    <div class="footer__modal">
      <transition name="fade">
        <Modal v-if="modal.open"
          :content="modal.content"
          @close="closeModal"
        />
      </transition>
    </div>
  </footer>
</template>

<script lang="ts">
import { State, Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import { ModalState } from '@/store/modules/modal/types'
import Modal from '@/components/molecules/Modal/Modal.vue'
import linksData from '@/data/links'

@Component({
  components: {
    Modal,
  }
})
export default class Footer extends Vue {
  @State(({ modal }) => modal)
  modal!: ModalState

  @Action('modal/openModal')
  openModal?: (content: string) => void

  @Action('modal/closeModal')
  closeModal?: () => void

  get linksData () {
    return linksData
  }

  gtmPush (selection: string) {
    this.$store.dispatch('gtm/push', {
      eventID: '76',
      eventAction: 'footer',
      eventLabel: selection,
    })
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: static;
  overflow: hidden;

  &__container {
    @include size(100%, auto);
    background-color: $dark-color;
    padding: 40px 20px 10px;
    position: relative;
    z-index: 2;
  }

  &__socials {
    margin: 0 0 30px;

    h4 {
      @include aktiv-grotesk-medium;
      text-transform: uppercase;
      letter-spacing: $letter-spacing;
      font-size: 1.2rem;
      text-align: center;
      margin: 0 0 16px;

      @include media ($md-breakpoint) { 
        font-size: 1.3rem;
      }
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        @include size(24px);
        margin: 0 10px;
        
        a {
          display: block;
        }
      }
    }
  }

  &__links {
    text-align: center;
    margin: 0 0 25px;

    a {
      line-height: 1;
      font-size: 1.2rem;
      display: inline-block;
      text-decoration: underline;
      text-transform: uppercase;
      letter-spacing: $letter-spacing*2;
      color: $lightE5-color;
      padding: 5px;
      margin: 0 5px;

      &:hover {
        font-weight: 700;
      }
    }
  }

  &__copyright {
    text-align: center;
    margin: 0 0 10px;

    button {
      @include aktiv-grotesk-regular;
      color: #959595;
      font-size: 1.1rem;
      cursor: pointer;
      text-align: center;
      display: inline-block;
      line-height: 1.2;
      text-decoration: underline;
      letter-spacing: .025rem;
      appearance: none;
      background: none;
      padding: 2px 5px;
      border: 0;
      margin: 0;

      &:hover {
        font-weight: 700;
      }
    }
  }

  &__modal {
    @include aktiv-grotesk-regular;
    color: $dark-color;
    position: static;
    font-size: 1.6rem;
  }

  /* &.reveal-enter-active, &.reveal-leave-active {
    transition: 1.6s;
    
    .footer {
      &__container {
        transition: transform .6s $ease-in-out-cubic 1s;
      }
    }
  }

  &.reveal-enter, &.reveal-leave-to {
    .footer {
      &__container {
        transform: translate(0, 100%);
      }
    }
  } */
}
</style>