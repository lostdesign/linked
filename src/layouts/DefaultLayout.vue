<template>
  <div class="mx-auto flex w-full items-start gap-x-4">
    <aside class="sticky top-8 hidden w-80 shrink-0 md:flex h-full border-r border-gray-700 p-4">
      <slot name="aside"/>
    </aside>

    <main class="flex-1 p-6 h-full">
      <slot name="main"/>
    </main>

  </div>
</template>
<script setup lang="ts">
</script>