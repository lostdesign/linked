<template>
  <Layout>
    <main class="flex-col items-stretch h-full">
      <div class="flex sticky top-0 bg-black justify-center space-x-2">
        <template v-for="day in currentWeek()">
          <span
            class="flex justify-center items-center self-center text-center bg-gray-900 w-14 h-14 my-4 rounded-lg font-black text-xs hover:bg-gray-800 cursor-pointer" 
            :key="day"
            @click="setDay(day)"
          >
            {{formatDate(day, 'dd.mm')}}
          </span>
        </template>
      </div>
      <p class="font-black">{{formatDate(today, 'year-mm-dd')}}</p>
      <!--<div>{{content}}</div>-->
      <br>
        <div class="editor ml-2">
          <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
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
            </div>
          </editor-menu-bar>
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
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
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
} from 'tiptap-extensions'

export default {
  components: {
    Layout,
    EditorContent,
    EditorMenuBar,
  },
  mixins: [Calendar, File],
  data() {
    return {
      editor: new Editor({
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
        ],
        content: `
          add something here
        `,
      }),
    }
  },
  methods: {
  },
  created() {
      this.loadFile()
      let keysPressed = {}

      document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true

        if (keysPressed['Meta'] && event.code == 'KeyS') {
          this.createFile()
        }

        if (event.code == 'ArrowLeft') {
          this.today = new Date(this.shiftDay(this.today, -1))
        }

        if (event.code == 'ArrowRight') {
          this.today = new Date(this.shiftDay(this.today, 1))
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