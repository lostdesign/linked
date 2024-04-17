<script setup lang="ts">
import BackIcon from "@/assets/icons/back.svg";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
</script>

<template>
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
    {{ t('settings.back') }}
  </router-link>
</template>
