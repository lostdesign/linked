<template>
  <div
    v-if='editor'
    class='px-10 mt-5 text-gray-400 dark:text-gray-500 relative flex-grow'
    @click='_focusEditor'
  >
    <bubble-menu class='bubble-menu' :editor='editor' v-if='editor'>
      <button @click='editor.chain().focus().toggleHighlight().run()'>
        <PenIcon />
      </button>
      <button @click='editor.chain().focus().toggleBold().run()'>
        <BoldIcon />
      </button>
      <button @click='editor.chain().focus().toggleItalic().run()'>
        <ItalicIcon />
      </button>
      <button @click='editor.chain().focus().toggleStrike().run()'>
        <StrikeThroughIcon />
      </button>
    </bubble-menu>
    <div class='text-black dark:text-white'>
      <editor-content class='pb-10' :editor='editor' v-model='getContent' />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  Getters as FileGetters,
  Actions as FileActions
} from '@/store/modules/file/types'

import PenIcon from '@/assets/icons/editor/pen.svg'
import BoldIcon from '@/assets/icons/editor/bold.svg'
import ItalicIcon from '@/assets/icons/editor/italic.svg'
import StrikeThroughIcon from '@/assets/icons/editor/strikethrough.svg'

import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-2'
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
import Commands from '@/components/slash-commands/commands'
import suggestion from '@/components/slash-commands/suggestions'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Gapcursor } from '@tiptap/extension-gapcursor'
import { CharacterCount } from '@tiptap/extension-character-count'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    PenIcon,
    BoldIcon,
    ItalicIcon,
    StrikeThroughIcon
  },
  data() {
    return {
      editor: null
    }
  },
  methods: {
    ...mapActions('file', [FileActions.SET_CONTENT, FileActions.SAVE_FILE]),
    _focusEditor() {
      this.editor
        .chain()
        .focus()
        .run()
    }
  },
  computed: {
    ...mapGetters('file', [FileGetters.GET_CONTENT])
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
        History,
        Commands.configure({
          suggestion,
        }),
        Placeholder.configure({
          includeChildren: true,
          placeholder: ({ node }) => {
            return {
              'paragraph': this.$t('commands.type_slash')
            }[node.type.name] ?? ''
          },
        }),
        Gapcursor,
        CharacterCount
      ],
      content: this.getContent,
      autofocus: true,
      onUpdate: ({ editor }) => {
        const data = editor.getHTML();
        this.editor.commands.clearContent()
        this.setContent(data)
        this.saveFile()
      }
    })
  },
  watch: {
    getContent(value) {
      if (this.editor.getHTML() === value) return
      this.editor.commands.setContent(this.getContent, false)
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>
