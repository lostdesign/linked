<template>
  <Layout>
    <main class="px-10 mt-10 text-black dark:text-white">
      <!--<router-link
        to="/"
        class="
          flex
          items-center
          align-center
          mb-3
          hover:text-red-500
          focus:outline-none
          focus:ring-1 focus:ring-red-800
          focus:border-red-500
        "
      >
        <span class="mr-1"><BackIcon /></span>
        {{ $t('settings.back') }}
      </router-link>-->
      <input
        type="text"
        name="search"
        id="search"
        class="
          shadow-sm
          focus:ring-red-600
          focus:border-red-600
          block
          w-full
          sm:text-sm
          border-gray-800
          rounded-md
          bg-gray-100
          text-wite
          dark:bg-gray-900
        "
        :placeholder="$t('command-panel.placeholder')"
      />
    </main>
  </Layout>
</template>

<script>
import Layout from './Layout.vue'
//import BackIcon from '@/assets/icons/back.svg'

export default {
  components: { Layout /* BackIcon */ },
  data() {
    return {
      keysPressed: {}
    }
  },
  methods: {
    _handleKeyDown(event) {
      this.keysPressed[event.key] = true
      if (event.code === 'Escape') {
        this.$router.push('/')
      }
    },
    _handleKeyUp(event) {
      delete this.keysPressed[event.key]
    }
  },
  mounted() {
    window.addEventListener('keydown', this._handleKeyDown)
    window.addEventListener('keyup', this._handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('keyUp', this._handleKeyUp)
  }
}
</script>