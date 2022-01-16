<template>
  <editor-content :editor="editor" />
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    Document,
    Paragraph,
    Text,
  ],
})
</script>
