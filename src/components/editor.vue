<template>
  <div v-if="editor">
    <div class="px-10 mt-5 text-gray-400 dark:text-gray-500 relative">
      <bubble-menu class="bubble-menu" :editor="editor" v-if="editor">
        <button @click="editor.chain().focus().toggleHighlight().run()">
          <PenIcon />
        </button>
        <button @click="editor.chain().focus().toggleBold().run()">
          <BoldIcon />
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()">
          <ItalicIcon />
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()">
          <StrikeThroughIcon />
        </button>
      </bubble-menu>
      <floating-menu class="floating-menu" :editor="editor" v-if="editor">
        <button @click="editor.chain().focus().toggleTaskList().run()">
          <CheckboxIcon />
        </button>
        <button @click="editor.chain().focus().toggleBulletList().run()">
          <BulletListIcon />
        </button>
        <button @click="editor.chain().focus().toggleCodeBlock().run()">
          <CodeIcon />
        </button>
      </floating-menu>
      <div class="text-black dark:text-white">
        <editor-content :editor="editor" v-model="getContent" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  Getters as FileGetters,
  Actions as FileActions
} from '@/store/modules/file/types'

import BulletListIcon from '@/assets/icons/bullet-list.svg'
import CheckboxIcon from '@/assets/icons/checkbox.svg'
import CodeIcon from '@/assets/icons/code.svg'
import PenIcon from '@/assets/icons/pen.svg'
import BoldIcon from '@/assets/icons/bold.svg'
import ItalicIcon from '@/assets/icons/italic.svg'
import StrikeThroughIcon from '@/assets/icons/strikethrough.svg'

import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-2'
import { extensions } from './tiptap-extensions'

export default {
  components: {
    EditorContent,
    FloatingMenu,
    BubbleMenu,
    BulletListIcon,
    CheckboxIcon,
    CodeIcon,
    PenIcon,
    BoldIcon,
    ItalicIcon,
    StrikeThroughIcon
  },
  data() {
    return {
      keysPressed: {},
      editor: null
    }
  },
  methods: {
    ...mapActions('file', [FileActions.SET_CONTENT, FileActions.SAVE_FILE])
  },
  computed: {
    ...mapGetters('file', [FileGetters.GET_CONTENT])
  },
  mounted() {
    this.editor = new Editor({
      extensions,
      content: this.getContent,
      autofocus: true,
      onUpdate: ({ editor }) => {
        this.setContent(editor.getHTML())
        this.saveFile()
      }
    })
  },
  watch: {
    getContent(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(this.getContent, false)
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>