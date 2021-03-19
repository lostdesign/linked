<template>
  <Layout>
    <main>
      <h1>Settings</h1>
      <span class="m-5 text-white self-end text-xs text-gray-500">v{{version}}</span>
    </main>
  </Layout>
</template>

<script>
const fs = window.require('fs')
const path = window.require('path')

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