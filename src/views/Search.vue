<template>
  <Layout>
    <main class='px-10 mt-10 text-black dark:text-white'>
      <div class='sticky top-0 bg-white dark:bg-black -mt-4 -m-0.5'>
        <div class='flex justify-between w-full pt-4'>
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
          <div v-if="searchResults.length >= 1" class='text-xs text-gray-600 dark:text-gray-300'>{{ searchResults.length || 0 }} {{ $t('settings.search.result_amount') }}</div>
        </div>
        <input
          type='text'
          name='search'
          id='search'
          v-model='searchTerm'
          ref='input'
          class="shadow-sm focus:ring-red-600 focus:border-red-600 block w-full sm:text-sm border-gray-800 rounded-md bg-gray-100 text-gray-900 dark:text-white dark:bg-secondary-black border-2 border-bright-pink outline-none p-2"
          :placeholder="$t('settings.search.placeholder')"
          @keydown='_handleSearch'
        />
      </div>
      <div v-if='_searchSomething' class='flex flex-col justify-center items-center mt-24'>
        <search-something class='w-2/3'/>
        <div class='mt-8 w-full text-center text-sm' v-html="$t('settings.search.start_searching')"></div>
      </div>
      <div v-else-if='_noResults' class='flex flex-col justify-center items-center mt-24'>
        <nothing-found class='w-2/3'/>
        <div class='mt-8 w-full text-center text-sm' v-html="$t('settings.search.no_result', {searchTerm})"></div>
      </div>
      <div v-else>
        <div 
          ref='results'
          class='bg-gray-200 dark:bg-gray-900 px-4 py-4 rounded-md mt-5 mb-5 ring-2 ring-transparent outline-none hover:ring-bright-pink focus:ring-bright-pink overflow-hidden' 
          v-for='dates in searchResults' 
          :key='dates.date'
          @click='_handleSearchResultClicked(dates.date)'
          @keydown.space='_handleSearchResultClicked(dates.date)'
          @keydown.enter='_handleSearchResultClicked(dates.date)'
          tabindex='0'
        >
          <h4 class='text-sm text-gray-600 dark:text-gray-300 text-right -mt-2'>{{_formatDate(dates.date)}}</h4>  
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
import { mapActions } from 'vuex'
import { formatDate } from '@/store/modules/calendar/helper'
import {
  Actions as CalendarActions
} from '@/store/modules/calendar/types'
import BackIcon from '@/assets/icons/back.svg'
import NothingFound from '@/assets/icons/nothing-found.svg'
import SearchSomething from '@/assets/icons/search-something.svg'

export default {
  components: { Layout, NothingFound, SearchSomething, BackIcon },
  data() {
    return {
      keysPressed: {},
      searchTerm: '',
      searchResults: { }
    }
  },
  methods: {
    ...mapActions('calendar', [CalendarActions.SET_DATE]),
    async search() {
      const result = await ipcRenderer.invoke('SEARCH', this.searchTerm)
      
      this.searchResults = result.sort((a, b) => {
        let keyA = new Date(a.date), keyB = new Date(b.date)

        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
        
        return 0
      })
    },
    _handleKeyDown(event) {
      this.keysPressed[event.key] = true
      if (event.code === 'Escape') {
        this.$router.push('/')
      }
    },
    _handleKeyUp(event) {
      delete this.keysPressed[event.key]
    },
    _handleSearchResultClicked(date) {
      this.setDate(date)
      this.$router.push('/')
    },
    _formatDate(date) {
      return formatDate(date,  'dd. MMM yyyy')
    },
    /*highlight(content) {
      if(!this.searchTerm) {
        console.log('no search term')
        return content;
      }

      //return content.replace(query, '<span class="highlight">' + query + '</span>')
      return content.replace(new RegExp(this.searchTerm, "gi"), match => {
        console.log(content, match, this.searchTerm)
        return '<mark class="p-1 font-medium underline">' + match + '</mark>';
      });
    }*/
  },
  computed: {
    _handleSearch() {
      return debounce(() => {
          this.search()
        }, 100
      )
    },
    _searchSomething() {
      return (!this.searchTerm || this.searchTerm.length === 0 )
    },
    _noResults() {
      return (this.searchResults
        && Object.keys(this.searchResults).length === 0
        && Object.getPrototypeOf(this.searchResults) === Object.prototype) && !(!this.searchTerm || this.searchTerm.length === 0 )
    }
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