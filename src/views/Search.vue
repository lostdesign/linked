<template>
  <Layout>
    <main class='px-10 mt-10 text-black dark:text-white'>
        <input
          
          type='text'
          name='search'
          id='search'
          v-model='searchTerm'
          ref='input'
          class='
          shadow-sm
          focus:ring-red-600
          focus:border-red-600
          block
          w-full
          sm:text-sm
          border-gray-800
          rounded-md
          bg-gray-100
          text-gray-900
          dark:text-white
          dark:bg-gray-900
          border-2 border-bright-pink
          outline-none
          p-2
        '
          :placeholder="$t('search.placeholder')"
          @keydown='_handleSearch'
        />
      <div v-if='searchResults'>
        <div class='bg-gray-800 p-2 rounded-lg mt-5' v-for='dates in searchResults' :key='dates.date'>
          <h3>{{dates.date}}</h3>  
          <div v-html='dates.content'/>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from './Layout'
const { ipcRenderer } = require('electron')
import { debounce } from 'lodash/function'

export default {
  components: { Layout /* BackIcon */ },
  data() {
    return {
      keysPressed: {},
      searchTerm: '',
      searchResults: null
    }
  },
  methods: {
    async search() {
      this.searchResults = await ipcRenderer.invoke('SEARCH', this.searchTerm)
    },
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
  computed: {
    _handleSearch() {
      return debounce(() => {
          this.search()
        }, 300
      )
    },
  },
  mounted() {
    window.addEventListener('keydown', this._handleKeyDown)
    window.addEventListener('keyup', this._handleKeyUp)
    this.$nextTick(() => this.$refs.input.focus())
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('keyUp', this._handleKeyUp)
  }
}
</script>