<script setup lang="ts">
import AppHeader from "@/components/app-header.vue";
import Editor from "@/components/editor.vue";
import {useCalendarStore} from "@/stores/useCalendarStore.ts";
import {onBeforeUnmount} from "vue";

const store = useCalendarStore()
onBeforeUnmount(() => console.log('destroying day'))
</script>

<template>
  <main class="flex flex-col items-stretch min-h-screen" :key="store.currentDate">
    <app-header/>
    <editor :key="store.currentDate"/>
  </main>
</template>