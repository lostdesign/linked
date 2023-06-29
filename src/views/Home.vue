<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import HouseIcon from "@/assets/icons/HouseIcon.svg?component";
import SettingsIcon from "@/assets/icons/SettingsIcon.svg?component";
import SearchIcon from "@/assets/icons/SearchIcon.svg?component";
import YearCalendar from "@/components/YearCalendar.vue";
</script>

<template>
  <DefaultLayout>
    <template #aside>
      <nav class="flex flex-col justify-between w-full">
        <div class="space-y-2">
          <RouterLink to="/" class="group hover:bg-surface-pink rounded-md flex p-2 space-x-2">
            <HouseIcon class="group-hover:text-surface-secondary-black"/>
            <span>Home</span>
          </RouterLink>

          <RouterLink to="/" class="group hover:bg-surface-pink rounded-md flex p-2 space-x-2">
            <SearchIcon class="group-hover:text-surface-secondary-black"/>
            <span>Search</span>
          </RouterLink>
        </div>

        <RouterLink to="/" class="group hover:bg-surface-pink rounded-md flex p-2 space-x-2">
          <SettingsIcon class="group-hover:text-surface-secondary-black"/>
          <span>Settings</span>
        </RouterLink>
      </nav>
    </template>
    <template #main>
      <YearCalendar/>
    </template>
  </DefaultLayout>
</template>
