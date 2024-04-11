<script setup lang="ts">
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useCalendarStore} from "@/stores/useCalendarStore.ts";
import {registerAll} from '@tauri-apps/api/globalShortcut';
import {getToday, shiftDateByDays} from "@/utils/calendar.ts";

const store = useCalendarStore()
const router = useRouter()

const shortcutRouteMap: Record<string, () => string> = {
  'CommandOrControl+.': () => `/day/${getToday()}`,
  'CommandOrControl+,': () => '/settings',
  'CommandOrControl+P': () => `/day/${shiftDateByDays(store.currentDate, -1)}`,
  'CommandOrControl+N': () => `/day/${shiftDateByDays(store.currentDate, 1)}`,
  'CommandOrControl+Shift+P': () => `/day/${shiftDateByDays(store.currentDate, -7)}`,
  'CommandOrControl+Shift+N': () => `/day/${shiftDateByDays(store.currentDate, 7)}`,
}

onMounted(async () => {
  await registerAll(Object.keys(shortcutRouteMap), async (shortcut: string) => {
    await router.push(shortcutRouteMap[shortcut]())
  });
  await router.push(`/day/${store.currentDate}`)
})
</script>

<template>
  <div class="flex flex-col bg-white text-black dark:bg-black min-h-screen">
    <div class="text-white w-full h-full min-h-screen">
      <router-view/>
    </div>
  </div>
</template>

