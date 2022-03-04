module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('vue-loader')
      .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },

  configureWebpack: {
    devtool: 'source-map'
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        mac: {
          hardenedRuntime: true,
          entitlements: './build/entitlements.mac.inherit.plist',
          // Disabled m1 due to it messing with the auto updating
          //target: {
          //  target: 'default',
          //  arch: ['arm64', 'x64']
          //}
        },
        linux: {
          target: [
            'deb',
            'rpm',
            'pacman',
            'AppImage'
          ]
        },
        win: {
          icon: '/build/icons/256x256.png',
          target: ['nsis', 'portable']
        },
        publish: ['github'],
        appId: 'design.lost.linked',
        afterSign: './afterSignHook.js'
      }
    },
    i18n: {
      locale: 'en-US',
      fallbackLocale: 'en-US',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
