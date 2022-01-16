<template>
  <div class="flex justify-between items-center align-center pt-6 px-10 mb-2">
    <span class="text-center text-3xl font-black">{{
      formatDate(getToday(), 'MMMM yyyy')
    }}</span>
    <!-- Week switcher -->
    <span class="text-black dark:text-white select-none flex justify-center items-center align-center space-x-1">
      <span
        class="text-bright-pink hover:text-red-400 cursor-pointer"
        @click="setDayTo(-7)"
      >
        <ArrowLeftIcon />
      </span>
      <span>
        <span class="mr-1 text-gray-400 dark:text-gray-600">
          Woche
        </span>
        {{ formatDate(getToday(), 'WW') }}
      </span>
      <span
        class="text-bright-pink hover:text-red-400 cursor-pointer"
        @click="setDayTo(7)"
      >
        <ArrowRightIcon />
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { formatDate, getToday } from '../../../common/calendar.js'

const setDayTo = (days: Number) => { console.log(days) }
</script>
