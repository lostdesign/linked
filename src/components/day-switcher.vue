<script setup lang="ts">
import {useCalendarStore} from "@/stores/useCalendarStore.ts";
import {computed} from "vue";
import {useRouter} from "vue-router";

const store = useCalendarStore()

const currentDate = computed(() => store.currentDate)
const currentWeek = computed(() => store.currentWeek)

const router = useRouter()

function switchDay(date: string) {
  router.push({name: 'day', params: {day: date}})
}
</script>

<template>
  <div
      class="
      flex
      dark:bg-black
      justify-center
      space-x-4
      z-50
      border-b border-gray-400
      dark:border-gray-800
      py-4
    "
  >
    <template v-for="date in currentWeek" :key="date.day">
      <div
          class="flex-col justify-center items-center self-center text-center"
      >
        <span
            class="block mb-1 text-xs text-gray-400 dark:text-gray-600"
            :class="{
            'text-bright-pink dark:text-red-500': date.isoDate === currentDate
          }"
        >
          {{ date.weekDay }}
        </span>
        <span
            class="
            flex
            justify-center
            items-center
            self-center
            text-center
            w-10
            h-10
            rounded-full
            font-black
            text-xs
            hover:bg-gray-200
            dark:hover:bg-gray-800
            cursor-pointer
            ring-bright-pink
          "
            :class="{
            'ring-4 text-sm': date.isoDate === currentDate
          }"
            :key="date.day"
            @click="switchDay(date.isoDate)"
        >
          {{ date.day }}
        </span>
      </div>
    </template>
  </div>
</template>
