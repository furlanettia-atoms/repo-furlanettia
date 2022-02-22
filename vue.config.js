const path = require('path')

const {
  VUE_APP_PUBLIC_PATH,
} = process.env

module.exports = {
  publicPath: VUE_APP_PUBLIC_PATH,

  productionSourceMap: false,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    },
    
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/scss/shared.scss')
      ]
    },
  },

  configureWebpack: {
    performance: {},
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 500000,
      }
    }
  },
}
