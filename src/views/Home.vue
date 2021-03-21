<template>
  <Layout>
    <main class="flex-col items-stretch h-full">
      <div class="sticky top-0 bg-black z-50">
        <p class="text-center text-2xl font-black my-4">{{formatDate(today, 'dd. mm. year')}}</p>
        <div class="flex bg-black justify-center space-x-4 mb-2 z-50 border-b border-gray-900">
          <template v-for="day in currentWeek()">
            <div :key="day" class="mb-6 flex-col justify-center items-center self-center text-center">
              <span
                class="block mb-1 text-xs text-gray-700"
                :class="{ 'text-red-400': formatDate(day, 'dd.mm') === formatDate(today, 'dd.mm') }">
                {{formatDate(day, 'day')}}
              </span>
              <span
                class="flex justify-center items-center self-center text-center w-10 h-10 rounded-full font-black text-xs hover:bg-gray-800 bg-gray-900 cursor-pointer"
                :class="{ 'ring-4 ring-red-900 text-sm': formatDate(day, 'dd.mm') === formatDate(today, 'dd.mm') }"
                :key="day"
                @click="setDay(day)">
                {{formatDate(day, 'dd')}}
              </span>
            </div>
          </template>
        </div>
      </div>
      <div class="editor ml-2">
        <editor-floating-menu :editor="editor" v-slot="{ commands, isActive, menu }">
          <div
            class="editor__floating-menu"
            :class="{ 'is-active': menu.isActive }"
            :style="`top: ${menu.top}px`"
          >

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
            >
              <svg width="14" height="16" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11C0.447716 11 0 10.5523 0 10V1C0 0.447715 0.447715 0 1 0H1.03236C1.58465 0 2.03237 0.447715 2.03237 1V4.19403H5.87054V1C5.87054 0.447715 6.31825 0 6.87054 0H6.90957C7.46185 0 7.90957 0.447715 7.90957 1V10C7.90957 10.5523 7.46185 11 6.90957 11H6.87054C6.31825 11 5.87054 10.5523 5.87054 10V6.08955H2.03237V10C2.03237 10.5523 1.58465 11 1.03237 11H1Z" fill="white"/>
                <path d="M10.5239 3.53731C10.1142 3.53731 9.78201 3.20516 9.78201 2.79543V2.79543C9.78201 2.40003 10.0927 2.07888 10.4862 2.0398C10.7251 2.01608 10.9102 1.98788 11.0414 1.95522C11.4234 1.8607 11.7344 1.67164 11.9743 1.38806C12.1387 1.19403 12.263 0.935323 12.3475 0.61194V0.61194C12.4068 0.376336 12.6177 0.179104 12.8607 0.179104H13.2104C13.6465 0.179104 14 0.532631 14 0.968728V10.0271C14 10.5644 13.5644 11 13.0271 11V11C12.4898 11 12.0543 10.5644 12.0543 10.0271V3.53731H10.5239Z" fill="white"/>
              </svg>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
            >
              <svg width="15" height="16" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999999 11C0.447715 11 0 10.5523 0 10V1C0 0.447715 0.447715 0 1 0H1.04784C1.60012 0 2.04784 0.447715 2.04784 1V4.19403H5.91523V1C5.91523 0.447715 6.36295 0 6.91523 0H6.96979C7.52207 0 7.96979 0.447715 7.96979 1V10C7.96979 10.5523 7.52207 11 6.96979 11H6.91523C6.36295 11 5.91523 10.5523 5.91523 10V6.08955H2.04784V10C2.04784 10.5523 1.60012 11 1.04784 11H0.999999Z" fill="white"/>
                <path d="M10.3561 11C9.7948 11 9.3327 10.5345 9.43902 9.98336C9.51426 9.5933 9.6288 9.22323 9.78263 8.87313C10.0557 8.15174 10.7002 7.38806 11.7163 6.58209C12.5981 5.8806 13.1688 5.37811 13.4285 5.07463C13.8268 4.60199 14.026 4.08458 14.026 3.52239C14.026 3.06468 13.9119 2.68408 13.6836 2.3806C13.4553 2.07711 13.1285 1.92537 12.7033 1.92537C12.1214 1.92537 11.7253 2.16667 11.5149 2.64925C11.4643 2.76596 11.4223 2.91147 11.3889 3.08578C11.2949 3.57751 10.9037 3.97761 10.4031 3.97761V3.97761C9.87668 3.97761 9.44588 3.53942 9.52513 3.01902C9.60029 2.52556 9.72193 2.10131 9.89005 1.74627C10.4003 0.666667 11.3068 0.126866 12.6093 0.126866C13.6388 0.126866 14.458 0.445274 15.0667 1.08209C15.6755 1.71393 15.9799 2.55224 15.9799 3.59702C15.9799 4.39801 15.765 5.10945 15.3353 5.73134C15.0533 6.14428 14.59 6.60448 13.9454 7.11194L13.18 7.71642C12.7011 8.09453 12.3721 8.36816 12.193 8.53731C12.0185 8.70647 11.8708 8.90299 11.7499 9.12687H15.0634C15.5807 9.12687 16 9.54618 16 10.0634V10.0634C16 10.5807 15.5807 11 15.0634 11H10.3561Z" fill="white"/>
              </svg>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
            >
              <svg width="15" height="16" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999999 10.7377C0.447715 10.7377 0 10.29 0 9.73775V0.999999C0 0.447714 0.447715 0 1 0H1.04784C1.60012 0 2.04784 0.447715 2.04784 1V4.09404H5.91523V1C5.91523 0.447715 6.36295 0 6.91523 0H6.96979C7.52207 0 7.96979 0.447715 7.96979 1V9.73775C7.96979 10.29 7.52207 10.7377 6.96979 10.7377H6.91523C6.36295 10.7377 5.91523 10.29 5.91523 9.73775V5.94437H2.04784V9.73775C2.04784 10.29 1.60012 10.7377 1.04784 10.7377H0.999999Z" fill="white"/>
                <path d="M10.2231 7.49603C10.7326 7.49603 11.1095 7.92379 11.2776 8.40472C11.2946 8.4534 11.3133 8.50017 11.3336 8.54503C11.5664 9.05497 11.9894 9.30993 12.6026 9.30993C12.9786 9.30993 13.3054 9.17152 13.5829 8.8947C13.8649 8.61302 14.0059 8.20993 14.0059 7.68543C14.0059 6.99095 13.7463 6.52715 13.227 6.29404C13.0631 6.22126 12.8467 6.16868 12.5779 6.1363C12.1673 6.08682 11.8305 5.76208 11.8305 5.34851V5.34851C11.8305 4.93949 12.1605 4.61763 12.5658 4.56293C12.8103 4.52994 12.9994 4.48048 13.133 4.41457C13.5583 4.2106 13.7709 3.79779 13.7709 3.17616C13.7709 2.77307 13.6612 2.44525 13.4419 2.19272C13.227 1.94018 12.9226 1.81391 12.5287 1.81391C12.0767 1.81391 11.7432 1.96932 11.5283 2.28013C11.4532 2.39105 11.3921 2.51527 11.345 2.65278C11.1872 3.11302 10.8273 3.52583 10.3407 3.52583V3.52583C9.84844 3.52583 9.44637 3.11517 9.53849 2.63156C9.5774 2.42727 9.62745 2.22757 9.68863 2.03245C9.84529 1.61965 10.0915 1.23841 10.4272 0.888742C10.6779 0.64106 10.9755 0.451656 11.3202 0.32053C11.6648 0.189404 12.0878 0.123841 12.5892 0.123841C13.5202 0.123841 14.27 0.386093 14.8384 0.910596C15.4114 1.43024 15.6979 2.12958 15.6979 3.00861C15.6979 3.63024 15.5278 4.15475 15.1876 4.58212C14.9727 4.84923 14.7489 5.03135 14.5162 5.12848C14.6907 5.12848 14.9414 5.29117 15.2681 5.61656C15.756 6.10706 16 6.77726 16 7.62715C16 8.52075 15.7135 9.30751 15.1406 9.98742C14.5721 10.6625 13.7284 11 12.6093 11C11.2307 11 10.2728 10.5119 9.73563 9.53576C9.56907 9.22885 9.44624 8.86602 9.36713 8.4473C9.27004 7.93344 9.7002 7.49603 10.2231 7.49603V7.49603Z" fill="white"/>
              </svg>
            </button>
            <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bold" width="16" height="16" viewBox="0 0 24 24" stroke-width="3" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z" />
                <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
              </svg>
            </button>

            <button class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-italic" width="16" height="16" viewBox="0 0 24 24" stroke-width="3" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="11" y1="5" x2="17" y2="5" />
                <line x1="7" y1="19" x2="13" y2="19" />
                <line x1="14" y1="5" x2="10" y2="19" />
              </svg>
            </button>

            <button class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-code" width="16" height="16" viewBox="0 0 24 24" stroke-width="3" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="7 8 3 12 7 16" />
                <polyline points="17 8 21 12 17 16" />
                <line x1="14" y1="4" x2="10" y2="20" />
              </svg>
            </button>
            <button class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list" width="16" height="16" viewBox="0 0 24 24" stroke-width="3" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="9" y1="6" x2="20" y2="6" />
                <line x1="9" y1="12" x2="20" y2="12" />
                <line x1="9" y1="18" x2="20" y2="18" />
                <line x1="5" y1="6" x2="5" y2="6.01" />
                <line x1="5" y1="12" x2="5" y2="12.01" />
                <line x1="5" y1="18" x2="5" y2="18.01" />
              </svg>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-blockquote" width="16" height="16" viewBox="0 0 24 24" stroke-width="3" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 15h15" />
                <path d="M21 19h-15" />
                <path d="M15 11h6" />
                <path d="M21 7h-6" />
                <path d="M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
                <path d="M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
              </svg>
            </button>
          </div>
        </editor-floating-menu>
        <editor-content class="editor__content outline-none" :editor="editor" />
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from './Layout'
import Calendar from '@/mixins/calendar'
import File from '@/mixins/file'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import { Editor, EditorContent, EditorMenuBar, EditorFloatingMenu} from 'tiptap'
import {
  CodeBlockHighlight,
  HardBreak,
  Heading,
  Image,
  Bold,
  Code,
  Italic,
  BulletList,
  ListItem,
  Blockquote
} from 'tiptap-extensions'

export default {
  components: {
    Layout,
    EditorContent,
    EditorMenuBar,
    EditorFloatingMenu,
  },
  mixins: [Calendar, File],
  data() {
    return {
      editor: new Editor({
        onUpdate: ({ getHTML }) => {
          // get new content on update
          this.content = getHTML()
          this.debounce(this.saveFile(), 400)
        },
        extensions: [
          new CodeBlockHighlight({
            languages: {
              javascript,
              css,
            },
          }),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Bold(),
          new Code(),
          new Italic(),
          new Image(),
          new ListItem(),
          new BulletList(),
          new Blockquote(),
        ],
        content: this.content,
      }),
    }
  },
  methods: {
  },
  mounted() {
    let keysPressed = {}

    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true

      if (keysPressed['Meta'] && event.code == 'KeyS') {
        this.createFile()
      }

      if (event.code == 'ArrowLeft') {
        this.today = this.formatDate(new Date(this.shiftDay(this.today, -1)), 'year-mm-dd')
      }

      if (event.code == 'ArrowRight') {
        this.today = this.formatDate(new Date(this.shiftDay(this.today, 1)), 'year-mm-dd')
      }
    })

    document.addEventListener('keyup', (event) => {
      delete keysPressed[event.key]
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style>
.editor {
  position: relative;
}
.editor__floating-menu {
  position: absolute;
  z-index: 1;
  margin-top: -0.25rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
}
.editor__floating-menu.is-active {
  opacity: 1;
  visibility: visible;
}

ul[data-type="todo_list"] {
	 padding-left: 0;
}
 li[data-type="todo_item"] {
	 display: flex;
	 flex-direction: row;
}
 .todo-checkbox {
	 border: 2px solid black;
	 height: 0.9em;
	 width: 0.9em;
	 box-sizing: border-box;
	 margin-right: 10px;
	 margin-top: 0.3rem;
	 user-select: none;
	 -webkit-user-select: none;
	 cursor: pointer;
	 border-radius: 0.2em;
	 background-color: transparent;
	 transition: 0.4s background;
}
 .todo-content {
	 flex: 1;
}
 .todo-content > p:last-of-type {
	 margin-bottom: 0;
}
 .todo-content > ul[data-type="todo_list"] {
	 margin: 0.5rem 0;
}
 li[data-done="true"] > .todo-content > p {
	 text-decoration: line-through;
}
 li[data-done="true"] > .todo-checkbox {
	 background-color: black;
}
 li[data-done="false"] {
	 text-decoration: none;
}

.menubar__button {
  @apply bg-gray-900 py-2 px-2 rounded-lg text-xs font-black;
}

code {
  @apply bg-gray-900 p-2 m-2 rounded-lg block box-border text-xs;
}

pre::before {
	 content: attr(data-language);
	 text-transform: uppercase;
	 display: block;
	 text-align: right;
	 font-weight: bold;
	 font-size: 0.6rem;
}
 pre code .hljs-comment, pre code .hljs-quote {
	 color: #999;
}
 pre code .hljs-variable, pre code .hljs-template-variable, pre code .hljs-attribute, pre code .hljs-tag, pre code .hljs-name, pre code .hljs-regexp, pre code .hljs-link, pre code .hljs-name, pre code .hljs-selector-id, pre code .hljs-selector-class {
	 color: #f2777a;
}
 pre code .hljs-number, pre code .hljs-meta, pre code .hljs-built_in, pre code .hljs-builtin-name, pre code .hljs-literal, pre code .hljs-type, pre code .hljs-params {
	 color: #f99157;
}
 pre code .hljs-string, pre code .hljs-symbol, pre code .hljs-bullet {
	 color: #9c9;
}
 pre code .hljs-title, pre code .hljs-section {
	 color: #fc6;
}
 pre code .hljs-keyword, pre code .hljs-selector-tag {
	 color: #69c;
}
 pre code .hljs-emphasis {
	 font-style: italic;
}
 pre code .hljs-strong {
	 font-weight: 700;
}
.ProseMirror:focus {
  outline: none;
}

.ProseMirror > ol, ul {
  list-style-type: disc !important;
  margin: 0.5rem !important;
  padding: 0.5rem !important;
}
</style>