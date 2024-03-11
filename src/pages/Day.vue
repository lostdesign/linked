<script setup lang="ts">
import AppHeader from "@/components/app-header.vue";
import Editor from "@/components/editor.vue";
import {useCalendarStore} from "@/stores/useCalendarStore.ts";

const store = useCalendarStore()
</script>

<template>
  <main class="flex flex-col items-stretch min-h-screen">
    <app-header/>
    <editor :key="store.currentDate"/>
  </main>
</template>