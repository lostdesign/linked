<script setup lang="ts">
import LocaleSettings from "@/components/locale-settings.vue";
import ThemeSettings from "@/components/theme-settings.vue";
import FilepathSettings from "@/components/filepath-settings.vue";
import UpdateSettings from "@/components/update-settings.vue";
import BackButton from "@/components/back-button.vue";
import SearchSettings from "@/components/search-settings.vue";
import {onMounted} from "vue";
import {registerAll} from "@tauri-apps/api/globalShortcut";
import {useRouter} from "vue-router";

const router = useRouter()

onMounted(async () => {
  await registerAll(['Esc'], async () => {
    await router.push('/')
  });
})
</script>

<template>
  <main class="px-10 mt-10 text-black dark:text-white">
    <back-button/>
    <locale-settings/>
    <theme-settings/>
    <filepath-settings/>
    <update-settings/>
    <search-settings/>
  </main>
</template>