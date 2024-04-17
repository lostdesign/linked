<script setup lang="ts">
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'

import {formatDate, shiftDateByDays} from "@/utils/calendar.ts";
import {useCalendarStore} from "@/stores/useCalendarStore.ts";
import {useRouter} from "vue-router";

const store = useCalendarStore()
const router = useRouter()

</script>

<template>
  <div class="flex justify-between items-center align-center pt-6 px-10 mb-2">
    <span class="text-center text-2xl font-black">
      {{ formatDate(store.currentDate, 'MMMM yyyy') }}
    </span>
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
        class="text-bright-pink hover:text-red-400 cursor-pointer"
        @click="router.push({name: 'day', params: {day: shiftDateByDays(store.currentDate, -7)}})"
      >
        <arrow-left-icon/>
      </span>
      <span>
        <span class="mr-1 text-gray-400 dark:text-gray-600">W</span>
        {{ formatDate(store.currentDate, 'WW') }}</span>
      <span
        class="text-bright-pink hover:text-red-400 cursor-pointer"
        @click="router.push({name: 'day', params: {day: shiftDateByDays(store.currentDate, 7)}})"
      >
        <arrow-right-icon/>
      </span>
    </span>
  </div>
</template>
