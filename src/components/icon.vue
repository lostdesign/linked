<template>
  <component :is="require(`@/assets/icons/${ this.$slots.default[0].text }.svg`)" />
</template>
