<template>
  <main-layout>
    <main class="flex flex-col items-stretch min-h-screen">
      <app-header />
      <linked-editor />
    </main>
  </main-layout>
</template>

<script lang="ts" setup>
import MainLayout from '/@/components/MainLayout.vue';
import AppHeader from '/@/components/AppHeader.vue';
import LinkedEditor from '/@/components/LinkedEditor.vue';
</script>
