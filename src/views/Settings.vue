<template>
  <Layout>
    <main class="px-10 mt-10 text-black dark:text-white">
      <router-link
        to="/"
        class="flex items-center align-center mb-3 hover:text-red-500 focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-500"
      >
        <span class="mr-1"><BackIcon /></span>
        {{ $t('settings.back') }}
      </router-link>
      <h1 class="mb-4">{{ $t('settings.title') }}</h1>
      <h3>{{ $t('settings.designMode') }}</h3>
      <div class="flex space-x-5 mb-4">
        <div
          @click="themeMode = 'light'"
          class="w-1/2 h-16 bg-gray-100 rounded-lg flex justify-center items-center align-center text-black hover:opacity-75 cursor-pointer"
        >
          <SunIcon />
        </div>
        <div
          @click="themeMode = 'dark'"
          class="w-1/2 h-16 bg-gray-800 rounded-lg flex justify-center items-center align-center text-white hover:opacity-75 cursor-pointer"
        >
          <MoonIcon />
        </div>
      </div>
      <h3 class="mt-4">{{ $t('settings.language') }}</h3>
      <dropdown
        :languages="languages"
        :activeLanguage="language"
        @languageSelect="_handleLanguageChange($event)"
      />
      <span
        class="fixed bottom-0 left-0 w-full p-5 text-center text-white self-end text-xs text-gray-500"
        >v{{ version }}</span
      >
    </main>
  </Layout>
</template>

<script>
import { version } from '../../package.json'
import Layout from './Layout'
import i18n, { loadLocaleMessages } from '@/locales'
import { DateTime } from 'luxon'
import Dropdown from '@/components/dropdown'
import BackIcon from '@/assets/icons/back.svg'
import SunIcon from '@/assets/icons/sun.svg'
import MoonIcon from '@/assets/icons/moon.svg'

const { ipcRenderer } = require('electron')

export default {
  data() {
    return {
      version,
      get themeMode() {
        const mode = localStorage.theme
        ipcRenderer.invoke('dark-mode:toggle', mode)

        return mode
      },
      // eslint-disable-next-line
      set themeMode(value) {
        ipcRenderer.invoke('dark-mode:toggle', value)
        location.reload()

        return (localStorage.theme = value)
      },
      get languages() {
        return loadLocaleMessages()
      },
      get language() {
        return localStorage.lang ?? 'en-US'
      },
      // eslint-disable-next-line
      set language(lang) {
        localStorage.lang = lang
        DateTime.local().setLocale(lang)
        return (i18n.locale = lang)
      }
    }
  },
  methods: {
    _handleLanguageChange(lang) {
      this.language = lang
    }
  },
  components: {
    BackIcon,
    Dropdown,
    MoonIcon,
    Layout,
    SunIcon
  }
}
</script>