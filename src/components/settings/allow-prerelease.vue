<template>
  <div>
    <h3 class='mt-8'>{{ $t('settings.allowPrerelease.title') }}</h3>
    <p class='text-sm text-gray-500'>{{ $t('settings.allowPrerelease.hint') }}</p>
    <div class='flex'>
      <input v-model='allowPrerelease' type='checkbox' />
      <span>{{ $t('settings.allowPrerelease.enabled') }}</span>
    </div>
  </div>
</template>

<script>
import { Getters as AppGetters, Actions as AppActions } from '@/store/modules/app/types'

export default {
  computed: {
    allowPrerelease: {
      get() {
        return this.$store.getters[`app/${AppGetters.GET_ALLOW_PRERELEASE}`];
      },
      set(value) {
        this.$store.dispatch(`app/${AppActions.SET_ALLOW_PRERELEASE}`, value)
      },
    },
  },
}
</script>
