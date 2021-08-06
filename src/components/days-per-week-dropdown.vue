<template>
  <div>
    <div class="mt-1 relative">
      <button
        type="button"
        class="relative w-full bg-gray-100 dark:bg-gray-800 rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-500 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded="true"
        id="listbox-days-of-week"
        @click="open = !open"
      >
        <span class="block truncate">{{ $t('settings.weektypes.' + selected) }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <DropdownIcon />
        </span>
      </button>
      <ul
        class="absolute z-10 mt-1 w-full bg-gray-100 dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        style="
          margin-left: 0 !important;
          margin-right: 0 !important;
          margin-top: 0.25rem !important;
        "
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-days-of-week"
        :aria-activedescendant="'listbox-days-of-week-option-' + selected"
        v-if="open"
      >
        <template v-for="(option, index) in daysPerWeekOptions">
          <li
            class="cursor-default select-none relative py-2 pl-8 pr-4"
            :id="'listbox-days-of-week-option-' + option"
            role="option"
            :key="index"
            @click="_handleDaysPerWeekOptionsChange(option)"
          >
            <span class="font-normal block truncate">{{ $t('settings.weektypes.' + option) }} </span>
            <span
              class="text-red-600 absolute inset-y-0 left-0 flex items-center pl-1.5"
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
import { mapActions } from 'vuex'
import { Actions as CalendarActions } from '@/store/modules/calendar/types'

export default {
  data() {
    return {
      open: false,
      selected: parseInt(localStorage.daysPerWeek) || 7,
      daysPerWeekOptions: [5, 7]
    }
  },
  methods: {
    ...mapActions('calendar', [CalendarActions.SET_CURRENT_WEEK]),
    _handleDaysPerWeekOptionsChange(option) {
      if (localStorage.daysPerWeek === option) return

      this.selected = option
      this.open = false
      localStorage.daysPerWeek = option
      this.setCurrentWeek()
    }
  },
  components: {
    TickIcon,
    DropdownIcon
  }
}
</script>
