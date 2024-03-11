import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {DateTime} from 'luxon'
import {getCurrentWeekDates, shiftDateByDays} from "../utils/calendar.ts";

export const useCalendarStore = defineStore('calendar', () => {
  const currentDate = ref(DateTime.now().toISODate())
  const currentWeek = computed(() => getCurrentWeekDates(currentDate.value))

  function setDate(date: string) {
    currentDate.value = date
  }

  function shiftDate(days: number) {
    currentDate.value = shiftDateByDays(currentDate.value, days)
  }

  return {currentDate, currentWeek, setDate, shiftDate}
})