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
      <h3 class="mt-8">{{ $t('settings.data.title') }}</h3>
      <p class="text-sm text-gray-500">
        {{ $t('settings.data.hint')}} 
        <span class="font-bold">{{ getDataPath }}</span>
      </p>
      <button class="
        bg-gray-100
        hover:bg-gray-200
        dark:bg-gray-800
        dark:hover:bg-gray-700
        rounded-lg
        flex
        justify-center
        items-center
        align-center
        text-gray-900
        dark:text-gray-200
        cursor-pointer
        w-full
        h-12
        mt-4
        "
              @click='setDataPath'
      >
        {{ $t('settings.data.choose') }}
      </button>
      <h3 class="mt-8">{{ $t('settings.updates.title') }}</h3>
      <p class="text-sm text-gray-500">{{ $t('settings.updates.hint') }}</p>
      <update-dropdown />
      <h3 class="mt-8">{{ $t('settings.search.index.title') }}</h3>
      <p class="text-sm text-gray-500">{{ $t('settings.search.index.hint') }}</p>
      <button class="
        bg-gray-100
        hover:bg-gray-200
        dark:bg-gray-800
        dark:hover:bg-gray-700
        rounded-lg
        flex
        justify-center
        items-center
        align-center
        text-gray-900
        dark:text-gray-200
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
          bg-white
          dark:bg-black
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
import { mapActions, mapGetters } from 'vuex'
import { Actions as AppActions, Getters as AppGetters } from '@/store/modules/app/types'

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
    // once the indexing is done, it would return true
    // could be used for animating the button but it seems
    // like that the indexing takes a fraction of a second
    reIndexAll,
    ...mapActions('app', [AppActions.SET_DATA_PATH]),
    _handleEscapeKey() {
      if (event.key !== 'Escape') return

      this.$router.push('/', () => {})
    },
  },
  computed: {
    ...mapGetters('app', [AppGetters.GET_DATA_PATH]),
  },
  mounted() {
    document.addEventListener('keyup', this._handleEscapeKey, true)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this._handleEscapeKey, true)
  }
}
</script>
