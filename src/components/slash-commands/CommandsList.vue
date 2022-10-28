<template>
  <div class="items w-64 dark:bg-secondary-black dark:text-white text-gray-900 bg-gray-100 p-2 rounded-lg h-auto overflow-scroll shadow-2xl ring-2 ring-gray-300 dark:ring-gray-700">
    <div v-if="items.length" >
      <template v-for="(item, index) in items">
        <div 
          class='item flex items-center space-x-3 w-full block m-0 px-2 py-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:focus:bg-gray-700 focus:bg-gray-200 outline-none' 
          :key="index" 
          :class="{ 'is-selected': index === selectedIndex }" 
          @click="selectItem(index)"
          @keyup.enter="selectItem(index)"
          tabindex='0'
        >
          <component class='h-5 w-5 dark:text-gray-400' :is='item.icon' />
          <p class='text-sm'>{{ item.title }}</p>
        </div>
      </template>
    </div>
    <div class="item" v-else>{{ noCommandFound }}</div>
  </div>
</template>

<script>
import { translate } from '../../translation'
import HeadingOne from '@/assets/icons/editor/heading-one.svg'
import HeadingTwo from '@/assets/icons/editor/heading-two.svg'
import HeadingThree from '@/assets/icons/editor/heading-three.svg'
import Bold from '@/assets/icons/editor/bold.svg'
import Italic from '@/assets/icons/editor/italic.svg'
import CodeBlock from '@/assets/icons/editor/code.svg'
import BulletList from '@/assets/icons/editor/bullet-list.svg'
import CheckBox from '@/assets/icons/editor/checkbox.svg'
import Detail from '@/assets/icons/editor/detail.svg'
import Divider from '@/assets/icons/editor/divider.svg'

export default {
  components: {
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    Bold,
    Italic,
    CodeBlock,
    BulletList,
    CheckBox,
    Detail,
    Divider
  },
  
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
      noCommandFound: null
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

    getIcon(iconKey) {
      return {
        'heading-one': HeadingOne,
        'heading-two': HeadingTwo,
        'heading-three': HeadingThree,
        'bold': Bold,
        'italic': Italic,
        'code-block': CodeBlock,
        'bullet-list': BulletList,
        'check-box': CheckBox,
        'divider': Divider
      }[iconKey]
    },
  },
  async created() {
    this.noCommandFound = await translate('commands.no_result')
  }
}
</script>

<style>
.item {
  border-radius: 0.4rem;
  border: 1px solid transparent;
}
.item.is-selected {
  @apply dark:bg-gray-700 bg-gray-200
}

</style>