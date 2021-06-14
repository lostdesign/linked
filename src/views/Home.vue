<template>
  <Layout>
    <main
      class="flex-col items-stretch h-full min-h-screen"
      @click="focusEditor"
    >
      <!-- Header Start -->
      <header
        class="
          sticky
          top-0
          text-black
          bg-white
          dark:bg-black
          dark:text-white
          z-50
          select-none
        "
      >
        <week-switcher />

        <!--
          Day switcher,
          already exists as own component, but currently isnt working, the editor content doesnt swap.

          going to fix when move to vuex
        -->
        <div
          class="
            flex
            dark:bg-black
            justify-center
            space-x-4
            z-50
            border-b border-gray-400
            dark:border-gray-800
            py-4
          "
        >
          <template v-for="date in getCurrentWeekDates()">
            <div
              :key="date.day"
              class="
                flex-col
                justify-center
                items-center
                self-center
                text-center
              "
            >
              <span
                class="block mb-1 text-xs text-gray-400 dark:text-gray-700"
                :class="{
                  'text-red-400 dark:text-red-500': date.isoDate === today
                }"
              >
                {{ date.weekDay }}
              </span>
              <span
                class="
                  flex
                  justify-center
                  items-center
                  self-center
                  text-center
                  w-10
                  h-10
                  rounded-full
                  font-black
                  text-xs
                  hover:bg-gray-200
                  dark:hover:bg-gray-800
                  cursor-pointer
                  ring-red-600
                  dark:ring-red-900
                "
                :class="{ 'ring-4 text-sm': date.isoDate === today }"
                :key="date.day"
                @click="setDay(date.isoDate)"
              >
                {{ date.day }}
              </span>
            </div>
          </template>
        </div>
      </header>
      <!-- Header End -->
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
            <editor-content :editor="editor" v-model="content" />
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from './Layout'
import Calendar from '@/mixins/calendar'
import File from '@/mixins/file'
import WeekSwitcher from '@/components/week-switcher'
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

const { ipcRenderer } = require('electron')

export default {
  components: {
    Layout,
    EditorContent,
    FloatingMenu,
    BubbleMenu,
    BulletListIcon,
    CheckboxIcon,
    CodeIcon,
    PenIcon,
    BoldIcon,
    ItalicIcon,
    StrikeThroughIcon,
    WeekSwitcher
  },
  mixins: [Calendar, File],
  data() {
    return {
      keysPressed: {},
      editor: null
    }
  },
  methods: {
    focusEditor() {
      this.editor.chain().focus().run()
    }
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
      content: this.content,
      autofocus: true,
      onUpdate: ({ editor }) => {
        this.content = editor.getHTML()
        this.debounce(this.saveFile(), 500)
      }
    })

    ipcRenderer.on('set-today', () => {
      this.today = this.getToday()
    })

    ipcRenderer.on('previous-day', () => {
      this.shiftDay(-1)
    })

    ipcRenderer.on('next-day', () => {
      this.shiftDay(1)
    })

    ipcRenderer.on('previous-week', () => {
      this.shiftDay(-7)
    })

    ipcRenderer.on('next-week', () => {
      this.shiftDay(7)
    })

    document.addEventListener('keydown', (event) => {
      this.keysPressed[event.key] = true
      const modifier = this.keysPressed['Shift'] && this.keysPressed['Control']

      if (modifier && event.code === 'Enter') {
        this.today = this.getToday()
      }

      if (modifier && event.code === 'ArrowLeft') {
        this.shiftDay(-1)
      }

      if (modifier && event.code === 'ArrowRight') {
        this.shiftDay(1)
      }
    })

    document.addEventListener('keyup', (event) => {
      delete this.keysPressed[event.key]
    })
  },

  watch: {
    content(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(this.content, false)
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>
