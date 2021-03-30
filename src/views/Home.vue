<template>
  <Layout>
    <main class="flex-col items-stretch h-full" @click="focusEditor">
      <div class="sticky top-0 text-black dark:bg-black dark:text-white z-50 select-none">
        <div class="flex justify-between items-center align-center mb-6 mt-6 px-10">
          <span class="text-center text-4xl font-black">{{this.formatDate('dd.LL.yyyy')}}</span>
          <span class="ml-4 text-red-500 select-none">
            <span @click="shiftDay(-7)">
              <svg  class="inline text-white hover:text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="none" d="M0 0h24v24H0z"/>
                <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" fill="currentColor"/>
              </svg>
            </span>
            KW{{this.formatDate('WW')}}
            <span @click="shiftDay(7)">
              <svg class="inline text-white hover:text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                <path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" fill="currentColor"/>
              </svg>
            </span>
          </span>
        </div>
        <div class="flex dark:bg-black justify-center space-x-4 z-50 border-b border-gray-400 dark:border-gray-800">
          <template v-for="date in getCurrentWeekDates()">
            <div :key="date.day" class="mb-6 flex-col justify-center items-center self-center text-center">
              <span
                class="block mb-1 text-xs text-gray-400 dark:text-gray-700"
                :class="{ 'text-red-400 dark:text-red-500': date.isoDate === today }">
                {{date.weekDay}}
              </span>
              <span
                class="flex justify-center items-center self-center text-center w-10 h-10 rounded-full font-black text-xs hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer ring-red-600 dark:ring-red-900"
                :class="{ 'ring-4 text-sm': date.isoDate === today }"
                :key="date.day"
                @click="setDay(date.isoDate)">
                {{date.day}} 
              </span>
            </div>
          </template>
        </div>
        <div v-if="editor" class="px-10 text-black dark:text-white border-b border-gray-400 dark:border-gray-800">
          <!--<button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive('heading', { level: 1 }) }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0H24V24H0z"/><path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" fill="currentColor"/></svg>
          </button>
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive('heading', { level: 2 }) }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0H24V24H0z"/><path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" fill="currentColor"/></svg>
          </button>
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive('heading', { level: 3 }) }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0H24V24H0z"/><path d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z" fill="currentColor"/></svg>
          </button>-->
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive('codeBlock') }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M23 12l-7.071 7.071-1.414-1.414L20.172 12l-5.657-5.657 1.414-1.414L23 12zM3.828 12l5.657 5.657-1.414 1.414L1 12l7.071-7.071 1.414 1.414L3.828 12z" fill="currentColor"/></svg>
          </button>
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().toggleHighlight().run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive('highlight') }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.243 18H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z" fill="currentColor"/></svg>
          </button>
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive({ textAlign: 'left' }) }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z" fill="currentColor"/></svg>
          </button>
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive({ textAlign: 'center' }) }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z" fill="currentColor"/></svg>
          </button>
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive({ textAlign: 'right' }) }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z" fill="currentColor"/></svg>
          </button>
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive({ textAlign: 'justify' }) }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z" fill="currentColor"/></svg>
          </button>
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().toggleTaskList().run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive('taskList') }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 2.992v18.016a1 1 0 0 1-.993.992H3.993A.993.993 0 0 1 3 21.008V2.992A1 1 0 0 1 3.993 2h16.014c.548 0 .993.444.993.992zm-9.707 10.13l-2.475-2.476-1.414 1.415 3.889 3.889 5.657-5.657-1.414-1.414-4.243 4.242z" fill="currentColor"/></svg>
          </button>
          <button
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'bg-red-600 dark:bg-red-900': editor.isActive('bulletList') }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
      <div v-if="editor">
        <div class="px-10 mt-5 text-black dark:text-white">
          <editor-content :editor="editor" v-model="content" />
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from './Layout'
import Calendar from '@/mixins/calendar'
import File from '@/mixins/file'
import { Editor, EditorContent } from '@tiptap/vue-2'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import CodeBlock from '@tiptap/extension-code-block'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'

export default {
  components: {
    Layout,
    EditorContent
  },
  mixins: [Calendar, File],
  data() {
    return {
      keysPressed: {},
      editor: null,
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
        TextAlign,
        Heading,
        Highlight,
        CodeBlock,
        BulletList,
        ListItem,
        Bold,
        Italic
      ],
      content: this.content,
      autofocus: true,
      onUpdate: ({ editor }) => {
        this.content = editor.getHTML()
        this.debounce(this.saveFile(), 500)
      }
    })

    document.addEventListener('keydown', (event) => {
      this.keysPressed[event.key] = true
      const modifier = this.keysPressed['Shift'] && this.keysPressed['Control']

      if (this.keysPressed['Meta'] && event.code === 'Comma') {
        this.$router.push('settings')
      }

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
    },
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
