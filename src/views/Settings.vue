<template>
  <Layout>
    <main class="px-10 mt-10 text-black dark:text-white">
      <router-link
        to="/"
        class="
          flex
          items-center
          align-center
          mb-3
          hover:text-bright-pink
          focus:outline-none
          focus:ring-2 focus:ring-bright-pink
          focus:border-bright-pink
        "
      >
        <span class="mr-1"><BackIcon /></span>
        {{ $t('settings.back') }}
      </router-link>
      <h1 class="mb-4">{{ $t('settings.title') }}</h1>
      <h3 class="mt-8">{{ $t('settings.languages.title') }}</h3>
      <p class="text-sm leading-5 text-gray-500">{{ $t('settings.languages.hint') }}</p>
      <language-dropdown />
      <h3 class="mt-8">{{ $t('settings.designMode.title') }}</h3>
      <p class="text-sm text-gray-500">{{ $t('settings.designMode.hint') }}</p>
      <theme-switcher />
      <h3 class="mt-8">{{ $t('settings.updates.title') }}</h3>
      <p class="text-sm text-gray-500">{{ $t('settings.updates.hint') }}</p>
      <update-dropdown />
      <h3 class="mt-4">{{ $t('settings.search.index.title') }}</h3>
      <p class="text-sm text-gray-500">{{ $t('settings.search.index.hint') }}</p>
      <button class="
        bg-gray-100
        rounded-lg
        flex
        justify-center
        items-center
        align-center
        text-black
        hover:opacity-75
        cursor-pointer
        w-full
        h-12
        mt-4
        mb-24
        "
        @click='reIndexAll'
      >
        {{ $t('settings.search.index.start') }}
      </button>
      <span
        class="
          bg-black
          fixed
          bottom-0
          left-0
          w-full
          p-5
          text-center text-white
          self-end
          text-xs text-gray-500
        "
        >v{{ version }}</span
      >
    </main>
  </Layout>
</template>

<script>
import { version } from '../../package.json'
import Layout from './Layout'
import LanguageDropdown from '@/components/language-dropdown'
import UpdateDropdown from '@/components/update-dropdown'
import BackIcon from '@/assets/icons/back.svg'
import ThemeSwitcher from '@/components/theme-switcher'
import { reIndexAll } from '@/store/modules/app/helper'

export default {
  components: {
    ThemeSwitcher,
    BackIcon,
    LanguageDropdown,
    UpdateDropdown,
    Layout,
  },
  data() {
    return {
      version
    }
  },
  methods: {
    reIndexAll,
    _handleEscapeKey() {
      if (event.key !== 'Escape') return

      this.$router.push('/', () => {})
    }
  },
  mounted() {
    document.addEventListener('keyup', this._handleEscapeKey, true)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this._handleEscapeKey, true)
  }
}
</script>
