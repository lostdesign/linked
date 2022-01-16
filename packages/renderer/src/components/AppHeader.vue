<template>
  <!-- Header Start -->
  <header
    class="
      sticky
      top-0
      text-black
      bg-white
      dark:bg-black
      dark:text-white
      z-50
      select-none
    "
  >
    <week-switcher />
    <day-switcher />
  </header>
</template>

<script lang="ts" setup>
import DaySwitcher from '/@/components/DaySwitcher.vue'
import WeekSwitcher from '/@/components/WeekSwitcher.vue'
</script>
