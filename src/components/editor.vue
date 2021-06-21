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
  Getters as StorageGetters,
  Actions as StorageActions
} from '@/store/modules/storage/types'

import BulletListIcon from '@/assets/icons/bullet-list.svg'
import CheckboxIcon from '@/assets/icons/checkbox.svg'
import CodeIcon from '@/assets/icons/code.svg'
import PenIcon from '@/assets/icons/pen.svg'
import BoldIcon from '@/assets/icons/bold.svg'
import ItalicIcon from '@/assets/icons/italic.svg'
import StrikeThroughIcon from '@/assets/icons/strikethrough.svg'

import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-2'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import CodeBlock from '@tiptap/extension-code-block'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Image from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Strike from '@tiptap/extension-strike'
import Link from '@tiptap/extension-link'
import History from '@tiptap/extension-history'

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
    ...mapActions('storage', [StorageActions.SET_CONTENT, StorageActions.SAVE_FILE])
  },
  computed: {
    ...mapGetters('storage', [StorageGetters.GET_CONTENT])
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        TaskList,
        TaskItem,
        Heading,
        Highlight,
        CodeBlock,
        BulletList,
        ListItem,
        Bold,
        Italic,
        Image,
        HorizontalRule,
        Strike,
        Link,
        History
      ],
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