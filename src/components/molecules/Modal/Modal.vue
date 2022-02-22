<template>
  <div class="mfp-wrap mfp-bg mfp-close-btn-in mfp-auto-cursor uiLayer uiLayer-common uiLayer-contentLoader uiLayer-copyrightLink mfp-ready" tabindex="-1" role="dialog" aria-labelledby="ui-layer-title-1635944556284" style="overflow: hidden auto;">
    <div @click.self="onClose" class="mfp-container mfp-inline-holder" tabindex="-1">
      <div class="mfp-content">
        <div class="inner">
          <div class="copyrightBody" data-ytos-accessible-popup-content="">
            <p class="text" v-html="content" />
          </div>
          <button @click="onClose" class="mfp-close" :aria-label="$t('shared.close')">{{ $t('shared.close') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Modal extends Vue {
  @Prop()
  content?: string

  @Emit('close')
  onClose () {
    return
  }
}
</script>

<style lang="scss">
.mfp-bg{
  background:rgba(#444, 0);
  line-height: 1.3;
  height:100%;
  left:0;
  overflow:hidden;
  position:fixed;
  top:0;
  width:100%;
  z-index:1042;

  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity .6s $ease-out-cubic;
  }

  &.fade-enter, 
  &.fade-leave-to {
    opacity: 0;
  }

  ::selection {
    background-color: $dark-color;
    color: $white-color;
  }
}
.mfp-bg.mfp-ready{
    background:rgba(#444, .8);
}
.mfp-bg.mfp-removing{
    background:rgba(#444, 0);
}
.mfp-wrap{
  -webkit-overflow-scrolling:touch;
  -webkit-backface-visibility:hidden;
  backface-visibility:hidden;
  height:100%;
  left:0;
  outline:none!important;
  position:fixed;
  top:0;
  width:100%;
  z-index:1043
}
.mfp-wrap.mfp-ready .mfp-content{
  opacity:1
}
.mfp-wrap.mfp-removing .mfp-content{
  opacity:0
}
.mfp-container{
  box-sizing:border-box;
  height:100%;
  left:0;
  position:absolute;
  text-align:center;
  top:0;
  right:0;
  
  [data-menu-open] &,
  [data-modal-open] & {
    right: var(--sw);
  }
}
@media(min-width:768px){
  .mfp-container{
    padding:0 8px
  }
  .mfp-container:before{
    content:"";
    display:inline-block;
    height:100%;
    vertical-align:middle
  }
  .mfp-align-top .mfp-container:before{
    display:none
  }
}
.mfp-content{
  display:table;
  height:100%;
  opacity:0;
  transition:opacity .5s
}
@media(min-width:768px){
  .mfp-content{
    background:#f6f6f6;
    display:inline-block;
    height:auto;
    max-width:40em;
    padding:3em 1em;
    position:relative;
    vertical-align:middle;
    z-index:1045
  }
}
@media(min-width:1024px){
  .mfp-content{
    max-width:48.75em
  }
}
.mfp-ajax-holder .mfp-content,.mfp-inline-holder .mfp-content{
  cursor:auto;
  width:100%
}
.mfp-auto-cursor .mfp-content{
  cursor:auto
}
.mfp-s-error .mfp-content{
  display:none
}
@media(max-width:767px){
  .mfp-content .inner{
    background:#f6f6f6;
    display:table-cell;
    padding:3em 1em;
    vertical-align:middle;
    z-index:1045
  }
}
@media(min-width:1024px){
  .mfp-content .inner{
    padding:1em
  }
}
.mfp-content .inner p{
  font-size:.8125em;
  letter-spacing:.0125em;

  b {
    @include aktiv-grotesk-bold;
    font-weight: bold;
  }

  a {
    color: $dark-color;
  }
}
@media(min-width:1024px){
  .mfp-content .inner p{
    font-size:.875em;
    letter-spacing:.0275em
  }
}
.mfp-content .inner p a{
  text-decoration:underline
}
.no-touch .mfp-content .inner p a:hover{
  cursor:pointer;
  font-weight:700
}
.mfp-content .layer-title{
  display:none
}
.mfp-content .buttonsRow{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  margin:16px auto 32px
}
.mfp-content .buttonsRow button{
  background-color:$dark-color;
  border-color:$dark-color;
  color:#fff;
  margin:16px 8px 0!important;
  text-align:center;
  text-transform:none;
  white-space:nowrap
}
.no-touch .mfp-content .buttonsRow button{
  transition:background-color .2s ease,color .2s ease,border-color .2s ease
}
.mfp-content .buttonsRow button.active,.mfp-content .buttonsRow button:active,.no-touch .mfp-content .buttonsRow button:active,.no-touch .mfp-content .buttonsRow button:focus,.no-touch .mfp-content .buttonsRow button:hover{
  background-color:#444;
  border-color:#444;
  color:#fff
}
.mfp-content .buttonsRow button.cancel,.mfp-content .buttonsRow button.closeBtn,.mfp-content .buttonsRow button.proceedAsGuest{
  background-color:transparent;
  border-color:$dark-color;
  color:$dark-color;
  text-align:center;
  text-transform:none
}
.no-touch .mfp-content .buttonsRow button.cancel,.no-touch .mfp-content .buttonsRow button.closeBtn,.no-touch .mfp-content .buttonsRow button.proceedAsGuest{
  transition:background-color .2s ease,color .2s ease,border-color .2s ease
}
.mfp-content .buttonsRow button.cancel.active,.mfp-content .buttonsRow button.cancel:active,.mfp-content .buttonsRow button.closeBtn.active,.mfp-content .buttonsRow button.closeBtn:active,.mfp-content .buttonsRow button.proceedAsGuest.active,.mfp-content .buttonsRow button.proceedAsGuest:active,.no-touch .mfp-content .buttonsRow button.cancel:active,.no-touch .mfp-content .buttonsRow button.cancel:focus,.no-touch .mfp-content .buttonsRow button.cancel:hover,.no-touch .mfp-content .buttonsRow button.closeBtn:active,.no-touch .mfp-content .buttonsRow button.closeBtn:focus,.no-touch .mfp-content .buttonsRow button.closeBtn:hover,.no-touch .mfp-content .buttonsRow button.proceedAsGuest:active,.no-touch .mfp-content .buttonsRow button.proceedAsGuest:focus,.no-touch .mfp-content .buttonsRow button.proceedAsGuest:hover{
  background-color:#444;
  border-color:#444;
  color:#fff
}
.mfp-close{
  background-image:url(~@/assets/img/close-icon.svg);
  background-position:50%;
  background-repeat:no-repeat;
  background-size:16px;
  background-color: transparent;
  cursor:pointer;
  height:16px;
  position:absolute;
  right:16px;
  text-indent:-9999em;
  top:16px;
  width:16px;
  z-index:1046;
  border: 0;
}
@media(max-width:767px){
  .mfp-close{
    padding:16px
  }
}
.mfp-ajax-cur{
  cursor:progress
}
.mfp-zoom-out-cur{
  cursor:zoom-out
}
.mfp-zoom{
  cursor:zoom-in
}
.mfp-close,.mfp-counter,.mfp-preloader{
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}
.mfp-hide{
  display:none!important
}
.mfp-preloader{
  color:#c0b7af;
  left:8px;
  margin-top:-.8em;
  position:absolute;
  right:8px;
  text-align:center;
  top:50%;
  width:auto;
  z-index:1044
}
.mfp-preloader a{
  color:#c0b7af
}
.mfp-preloader a:hover{
  color:#fff
}
.mfp-s-ready .mfp-preloader{
  display:none
}
.mfp-counter{
  color:#c0b7af;
  font-size:12px;
  line-height:18px;
  position:absolute;
  right:0;
  top:0
}
</style>