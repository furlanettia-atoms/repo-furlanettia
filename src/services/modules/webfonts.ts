import WebFont from 'webfontloader'

export const fetchWebFont = () => {
  return new Promise<void>(resolve => {
    WebFont.load({
      classes: false,
      active: resolve,
      custom: {
        urls: [`${process.env.VUE_APP_PUBLIC_PATH}fonts/font-faces.css`],
        families: [
          'Acta Display W01 Book',
          'AktivGrotesk-Regular',
          'AktivGrotesk-Medium',
          'AktivGrotesk-Bold',
        ],
      }
    })
  })
}