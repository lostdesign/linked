<template>
  <div class="flex space-x-5 mb-4">
    <div
      @click="setTheme('light')"
      class="
        w-1/2
        h-16
        bg-gray-100
        rounded-lg
        flex
        justify-center
        items-center
        align-center
        text-black
        hover:opacity-75
        cursor-pointer
      "
    >
      <SunIcon />
    </div>
    <div
      @click="setTheme('dark')"
      class="
        w-1/2
        h-16
        bg-gray-800
        rounded-lg
        flex
        justify-center
        items-center
        align-center
        text-white
        hover:opacity-75
        cursor-pointer
      "
    >
      <MoonIcon />
    </div>
  </div>
</template>

<script>
import MoonIcon from '@/assets/icons/moon.svg'
import SunIcon from '@/assets/icons/sun.svg'
import { mapActions } from 'vuex'
import { Actions as AppActions } from '@/store/modules/app/types'

export default {
  components: {
    MoonIcon,
    SunIcon
  },
  methods: {
    ...mapActions('app', [AppActions.SET_THEME])
  }
}
</script>
