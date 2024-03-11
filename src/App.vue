<script setup lang="ts">
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useCalendarStore} from "@/stores/useCalendarStore.ts";

const router = useRouter()
const store = useCalendarStore()

onMounted(() => router.push(`/day/${store.currentDate}`))
</script>

<template>
  <div class="flex flex-col bg-white text-black dark:bg-black min-h-screen">
    <div class="text-white w-full h-full min-h-screen">
      <router-view/>
    </div>
  </div>
</template>

