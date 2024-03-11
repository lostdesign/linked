<template>
  <header
    class="
      sticky
      top-0
      text-black
      bg-white
      dark:bg-black
      dark:text-white
      select-none
      z-50
    "
  >
    <week-switcher />
    <day-switcher />
  </header>
</template>
<script setup lang="ts">
import WeekSwitcher from "@/components/week-switcher.vue";
import DaySwitcher from "@/components/day-switcher.vue";
</script>