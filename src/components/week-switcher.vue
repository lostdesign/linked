<template>
  <div class="flex justify-between items-center align-center pt-6 px-10 mb-2">
    <span class="text-center text-4xl font-black">{{
      this.formatDate('MMMM yyyy')
    }}</span>
    <!-- Week switcher -->
    <span
      class="
        text-black
        dark:text-white
        select-none
        flex
        justify-center
        items-center
        align-center
        space-x-1
      "
    >
      <span
        class="text-red-800 hover:text-red-400 cursor-pointer"
        @click="shiftDay(-7)"
      >
        <ArrowLeftIcon />
      </span>
      <span>
        <span class="mr-1 text-gray-400 dark:text-gray-700">
          {{ $t('home.calendarWeek') }}
        </span>
        {{ this.formatDate('WW') }}</span
      >
      <span
        class="text-red-800 hover:text-red-400 cursor-pointer"
        @click="shiftDay(7)"
      >
        <ArrowRightIcon />
      </span>
    </span>
  </div>
</template>

<script>
import Calendar from '@/mixins/calendar'
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'

export default {
  mixins: [Calendar],
  components: {
    ArrowLeftIcon,
    ArrowRightIcon
  }
}
</script>

