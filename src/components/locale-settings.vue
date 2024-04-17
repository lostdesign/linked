<script setup lang="ts">
import {ref} from "vue";
import DropdownIcon from '@/assets/icons/dropdown.svg'
import TickIcon from '@/assets/icons/tick.svg'
import {SUPPORT_LOCALES} from "@/i18n.ts";
import {useI18n} from "vue-i18n";

const open = ref(false)
const {messages, locale} = useI18n();

function handleLanguageChange(desiredLocale: string) {
  locale.value = desiredLocale;
  localStorage.setItem('lang', desiredLocale)
  open.value = !open.value
}
</script>

<template>
  <div class="relative">
    <h3 class="mt-8">{{ $t('settings.languages.title') }}</h3>
    <p class="text-sm leading-5 text-gray-500">{{ $t('settings.languages.hint') }}</p>
    <button
        type="button"
        class="
        mt-4
          relative
          w-full
          bg-gray-100
          dark:bg-gray-800
          rounded-md
          pl-3
          pr-10
          py-2
          text-left
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
      <span class="block truncate">{{ messages[locale].title }}</span>
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
          <DropdownIcon/>
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
      <template v-for="availableLocale in SUPPORT_LOCALES">
        <li
            class="cursor-pointer select-none relative py-2 pl-8 pr-4 flex space-x-4 group hover:bg-bright-pink rounded-lg"
            id="listbox-option-0"
            role="option"
            @click="handleLanguageChange(availableLocale)"
        >
          <span
              class="
              group-hover:text-white
                text-bright-pink
                items-center
                pl-1.5
                w-5
                h-5
                -ml-9
              "
              v-if="availableLocale == locale"
          >
              <TickIcon/>
            </span>
          <span class="font-normal block truncate">
            {{ messages[availableLocale].title  }} <span class="text-xs italic opacity-50">({{availableLocale}})</span>
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>