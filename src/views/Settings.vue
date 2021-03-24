<template>
  <Layout>
    <main class="px-10 mt-10">
      <router-link to="/" class="flex items-center align-center mb-3 hover:text-red-500">
      <span class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="currentColor"/></svg></span>
        Back
      </router-link>
      <h1>Settings</h1>
      <span class="fixed bottom-0 left-0 w-full p-5 text-center text-white self-end text-xs text-gray-500">v{{version}}</span>
    </main>
  </Layout>
</template>

<script>

import {version} from '../../package.json'
import Layout from './Layout'

export default {
  data() {
    return {
      version
    }
  },
  components: {
    Layout
  },
  methods: {

  }
}
</script>