<template>
  <div class="items w-64 dark:bg-secondary-black dark:text-white text-black bg-gray-300 p-2 rounded-lg">
    <div v-if="items.length" >
      <template v-for="(item, index) in items">
        <div class='item' :key="index" :class="{ 'is-selected': index === selectedIndex }" @click="selectItem(index)">
          <p>{{ item.title }}</p>
          <span class="text-xs text-gray-500"> {{ item.description }}</span>
        </div>
      </template>
    </div>
    <div class="item" v-else>
      No result
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        this.command(item)
      }
    },
  },
}
</script>

<style>
.item {
  display: block;
  margin: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  padding: 0.2rem 0.4rem;
}
.item.is-selected {
  @apply dark:bg-gray-700 bg-gray-400
}

</style>