<template>
  <div class="flex flex-col h-screen">
    <div class="text-white w-full h-full">
      <slot />
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar"

export default {
  components: {
    navBar
  }
}
</script>