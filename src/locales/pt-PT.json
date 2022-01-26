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
      <h3>{{ $t('settings.designMode') }}</h3>
      <theme-switcher />
      <h3 class="mt-4">{{ $t('settings.language') }}</h3>
      <LanguageDropdown />
      <span
        class="
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
import BackIcon from '@/assets/icons/back.svg'
import ThemeSwitcher from '@/components/theme-switcher'

export default {
  components: {
    ThemeSwitcher,
    BackIcon,
    LanguageDropdown,
    Layout
  },
  data() {
    return {
      version
    }
  },
  methods: {
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
