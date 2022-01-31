<template>
  <div>
    <div class="mt-4 relative">
      <button
        type="button"
        class="
          relative
          w-full
          bg-gray-100
          dark:bg-gray-800
          rounded-md
          pl-3
          pr-10
          py-2
          text-left
          cursor-default
          focus:outline-none
          focus:ring-2 focus:ring-bright-pink
          focus:border-bright-pink
          sm:text-sm
          cursor-pointer
        "
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        @click="open = !open"
      >
        <span class="block truncate">{{ selected }}</span>
        <span
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <DropdownIcon />
        </span>
      </button>
      <ul
        class="
          absolute
          z-10
          mt-1
          w-full
          bg-gray-100
          dark:bg-gray-800
          shadow-lg
          max-h-60
          rounded-md
          py-1
          text-base
          ring-1 ring-black ring-opacity-5
          overflow-auto
          focus:outline-none
          sm:text-sm
        "
        style="
          margin-left: 0 !important;
          margin-right: 0 !important;
          margin-top: 0.25rem !important;
        "
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
        v-if="open"
      >
        <template v-for="(option, index) in options">
          <li
            class="cursor-default select-none relative py-2 pl-8 pr-4"
            id="listbox-option-0"
            role="option"
            :key="index"
            @click="_handleOptionChange(index)"
          >
            <span class="font-normal block truncate">{{ option }} </span>
            <span
              class="
                text-bright-pink
                absolute
                inset-y-0
                left-0
                flex
                items-center
                pl-1.5
              "
              v-if="selected === option"
            >
              <TickIcon />
            </span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import TickIcon from '@/assets/icons/tick.svg'
import DropdownIcon from '@/assets/icons/dropdown.svg'
import { mapActions, mapGetters } from 'vuex'
import { Actions as AppActions, Getters as AppGetters } from '@/store/modules/app/types'

export default {
  data() {
    return {
      open: false,
    }
  },
  methods: {
    ...mapActions('app', [AppActions.SET_UPDATE_INTERVAL, AppActions.SYNC_UPDATE_INTERVAL]),
    
    _handleOptionChange(option) {
      this.setUpdateInterval(option)
      this.open = false
    }
  },
  computed: {
    ...mapGetters('app', [AppGetters.GET_UPDATE_INTERVAL]),
    options() {
      return [this.$t('settings.updates.daily'), this.$t('settings.updates.weekly')]
    },
    selected() {
      return this.options[this.getUpdateInterval]
    }
  },
  created() {
    this.syncUpdateInterval()
  },
  components: {
    TickIcon,
    DropdownIcon
  }
}
</script>
