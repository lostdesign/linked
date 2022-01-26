<template>
  <div class="flex space-x-5 mb-4 mt-4">
    <button
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
      :class="{'ring-2 ring-bright-pink' : this.getTheme() === 'light'}"
    >
      <SunIcon />
    </button>
    <button
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
      :class="{'ring-2 ring-bright-pink' : this.getTheme() === 'dark'}"
    >
      <MoonIcon />
    </button>
  </div>
</template>

<script>
import MoonIcon from '@/assets/icons/moon.svg'
import SunIcon from '@/assets/icons/sun.svg'
import { mapActions, mapGetters } from 'vuex'
import { Actions as AppActions, Getters as AppGetters } from '@/store/modules/app/types'

export default {
  components: {
    MoonIcon,
    SunIcon
  },
  methods: {
    ...mapActions('app', [AppActions.SET_THEME]),
    ...mapGetters('app', [AppGetters.GET_THEME])
  }
}
</script>
