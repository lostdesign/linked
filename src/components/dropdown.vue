<template>
  <div>
    <div class="mt-1 relative">
      <button
        type="button"
        class="relative w-full bg-gray-800 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-500 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        @click="open = !open"
      >
        <span class="block truncate">{{ languages[selected].title }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <DropdownIcon />
        </span>
      </button>
      <ul
        class="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
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
        <template v-for="(lang, index) in languages">
          <li
            class="text-white cursor-default select-none relative py-2 pl-8 pr-4"
            id="listbox-option-0"
            role="option"
            :key="index"
            @click="
              selected = index
              open = false
              $emit('languageSelect', index)
            "
          >
            <span class="font-normal block truncate">{{ lang.title }} </span>
            <span
              class="text-red-600 absolute inset-y-0 left-0 flex items-center pl-1.5"
              v-if="selected === index"
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

export default {
  props: ['languages', 'activeLanguage'],
  data() {
    return {
      open: false,
      selected: this.activeLanguage
    }
  },
  components: {
    TickIcon,
    DropdownIcon
  }
}
</script>