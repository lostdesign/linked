<template>
  <div
    v-if="editor"
    class="px-10 mt-5 text-gray-400 dark:text-gray-500 relative flex-grow"
    @click="_focusEditor"
  >
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
      <button @click="toggleLink">
        <LinkIcon />
      </button>
      <button @click="unlink" ref="unlinkIcon" v-if="canUnlink">
        <UnlinkIcon />
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
    <form
      @submit.prevent
      class="
        z-100
        link-modal
        flex
        items-center
        absolute
        top-0
        left-1/2
        w-auto
        transform
        -translate-x-1/2
      "
      :class="{ hidden: !linkModalOpen }"
    >
      <input
        class="
          link-input
          w-1/2
          sm:w-48
          border-none
          outline-none
          py-1
          px-3
          pr-5
          bg-gray-200
          text-gray-800
          dark:bg-gray-800 dark:text-gray-200
        "
        type="text"
        placeholder="https://"
        ref="linkInput"
        @blur="resetLinkModal"
        @keyup.enter="setLink"
      />
      <ArrowRightIcon
        class="cursor-pointer transform -translate-x-full"
        @click="setLink"
      />
    </form>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import { mapGetters, mapActions } from 'vuex'
import {
  Getters as FileGetters,
  Actions as FileActions
} from '@/store/modules/file/types'

import ArrowRightIcon from '@/assets/icons/arrow-right.svg'
import UnlinkIcon from '@/assets/icons/unlink.svg'
import BulletListIcon from '@/assets/icons/bullet-list.svg'
import CheckboxIcon from '@/assets/icons/checkbox.svg'
import CodeIcon from '@/assets/icons/code.svg'
import PenIcon from '@/assets/icons/pen.svg'
import BoldIcon from '@/assets/icons/bold.svg'
import ItalicIcon from '@/assets/icons/italic.svg'
import StrikeThroughIcon from '@/assets/icons/strikethrough.svg'
import LinkIcon from '@/assets/icons/link.svg'

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
    ArrowRightIcon,
    UnlinkIcon,
    BulletListIcon,
    CheckboxIcon,
    CodeIcon,
    PenIcon,
    BoldIcon,
    ItalicIcon,
    StrikeThroughIcon,
    LinkIcon
  },
  data() {
    return {
      editor: null,
      canUnlink: false,
      linkModalOpen: false
    }
  },
  methods: {
    test() {
      console.log(111)
    },
    ...mapActions('file', [FileActions.SET_CONTENT, FileActions.SAVE_FILE]),
    _focusEditor() {
      if (!this.linkModalOpen) this.editor.chain().focus().run()
    },
    getSelectedText() {
      const { view, state } = this.editor
      const { from, to } = view.state.selection
      return state.doc.textBetween(from, to, '')
    },
    isStringLink(string) {
      return /^((https?|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}|localhost)(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(
        string
      )
    },
    getValidUrl(url = '') {
      let newUrl = window.decodeURIComponent(url)
      newUrl = newUrl.trim().replace(/\s/g, '')

      if (/^(:\/\/)/.test(newUrl)) {
        return `http${newUrl}`
      }
      if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
        return `http://${newUrl}`
      }

      return newUrl
    },
    setLink() {
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: this.$refs.linkInput.value })
        .run()
    },
    resetLinkModal() {
      this.linkModalOpen = false
      this.$refs.linkInput.value = ''
    },
    openLink(url) {
      if (url !== undefined || url !== '')
        ipcRenderer.send('openurl', String(url))
    },
    unlink() {
      this.linkModalOpen = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
      this.editor.chain().focus().extendMarkRange('link').unsetLink().run()
    },
    toggleLink() {
      let selectedText = this.getSelectedText()

      if (selectedText === null) {
        return
      }

      // empty
      if (selectedText === '') {
        this.editor.chain().focus().extendMarkRange('link').unsetLink().run()

        return
      }

      if (this.isStringLink(selectedText) == true) {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: selectedText })
          .run()

        return
      }

      this.linkModalOpen = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })

      if (this.canUnlink)
        this.$refs.linkInput.value = this.editor.getAttributes('link').href
    }
  },

  computed: {
    ...mapGetters('file', [FileGetters.GET_CONTENT])
  },
  mounted() {
    var self = this
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
        Link.configure({
          HTMLAttributes: {
            class: 'link'
          },
          linkOnPaste: true,
          openOnClick: false
        }),
        History
      ],
      content: this.getContent,
      autofocus: true,
      onUpdate: ({ editor }) => {
        this.setContent(editor.getHTML())
        this.saveFile()
      },
      onSelectionUpdate({ editor }) {
        let previousLink = editor.getAttributes('link').href
        self.canUnlink =
          previousLink !== undefined && previousLink.length > 0 ? true : false
      }
    })
    document.addEventListener('click', (element) => {
      if (element.target !== undefined) {
        if (element.target.classList.contains('link')) {
          let lastLink = self.editor.getAttributes('link').href

          if (lastLink) {
            this.openLink(this.getValidUrl(lastLink))
            return
          }

          this.toggleLink()
        }
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

  // @richardev - @lost shouldn't this be beforeUnmounted() 🤔 ???
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>
