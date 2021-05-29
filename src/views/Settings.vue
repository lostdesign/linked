<template>
  <Layout>
    <main class="px-10 mt-10 text-black dark:text-white">
      <router-link
        to="/"
        class="flex items-center align-center mb-3 hover:text-red-500"
      >
        <span class="mr-1"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
              fill="currentColor"
            /></svg
        ></span>
        {{ $t('settings.back') }}
      </router-link>
      <h1 class="mb-4">{{ $t('settings.title') }}</h1>
      <h3>{{ $t('settings.designMode') }}</h3>
      <div class="flex space-x-5 mb-4">
        <div
          @click="themeMode = 'light'"
          class="w-1/2 h-16 bg-gray-100 rounded-lg flex justify-center items-center align-center text-black hover:opacity-75 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          @click="themeMode = 'dark'"
          class="w-1/2 h-16 bg-gray-800 rounded-lg flex justify-center items-center align-center text-white hover:opacity-75 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <h3>{{ $t('settings.language') }}</h3>
      <div class="flex space-x-5 mb-4">
        <template v-for="(lang, index) in languages">
          <div
            :key="index"
            @click="language = index"
            :class="{
              'bg-gray-800 text-white': index !== language,
              'bg-gray-100 text-black': index === language
            }"
            class="w-1/2 h-16 rounded-lg flex justify-center items-center align-center hover:opacity-75 cursor-pointer"
          >
            {{ lang.title }}
          </div>
        </template>
      </div>
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
      set themeMode(value) {
        // eslint-disable-line
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
  components: {
    Layout
  }
}
</script>