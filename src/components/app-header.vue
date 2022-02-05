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
      select-none
      z-50
    "
  >
    <week-switcher />
    <day-switcher />
  </header>
</template>

<script>
import DaySwitcher from '@/components/day-switcher'
import WeekSwitcher from '@/components/week-switcher'

export default {
  components: { DaySwitcher, WeekSwitcher }
}
</script>