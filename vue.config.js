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
          target: {
            target: 'default',
            arch: ['arm64', 'x64']
          }
        },
        linux: {
          target: [
            'deb',
            'rpm',
            'pacman',
            {
              target: 'AppImage',
              arch: ['x64', 'armv7l', 'arm64']
            }
          ]
        },
        win: {
          target: [
            'nsis',
            'portable',
            {
              target: 'zip',
              arch: ['x64', 'arm64']
            }
          ]
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
