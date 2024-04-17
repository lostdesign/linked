<script setup lang="ts">
import {useI18n} from "vue-i18n";
const {t} = useI18n()
</script>

<template>
  <h3 class="mt-8">{{ t('settings.updates.title') }}</h3>
  <p class="text-sm text-gray-500">{{ t('settings.updates.hint') }}</p>
</template>