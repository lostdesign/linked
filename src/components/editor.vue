<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { watchDebounced } from "@vueuse/core";
import { useCalendarStore } from "@/stores/useCalendarStore.ts";
import { fetchContent, storeContent } from "@/utils/storage.ts";
import { EditorContent, Editor } from "@tiptap/vue-3";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Paragraph } from "@tiptap/extension-paragraph";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Heading } from "@tiptap/extension-heading";
import { CodeBlock } from "@tiptap/extension-code-block";
import { BulletList } from "@tiptap/extension-bullet-list";
import { ListItem } from "@tiptap/extension-list-item";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Link } from "@tiptap/extension-link";
import { Highlight } from "@tiptap/extension-highlight";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Strike } from "@tiptap/extension-strike";
import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import { History } from "@tiptap/extension-history";

const store = useCalendarStore();
const editor = ref();
const content = ref("");

onMounted(async () => {
  editor.value = new Editor({
    autofocus: true,
    content: (await fetchContent(store.currentDate)) as string,
    editable: true,
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
      HorizontalRule,
      Strike,
      Link,
      History,
      /*Commands.configure({
        suggestion,
      }),
      Image,
      Placeholder.configure({
        includeChildren: true,
        placeholder: ({ node }) => {
          return {
            'paragraph': this.$t('commands.type_slash')
          }[node.type.name] ?? ''
        },
      }),*/
      Gapcursor,
      CharacterCount,
    ],
    onUpdate: async ({ editor }) => {
      content.value = editor.getHTML();
    },
  });
});

const focusEditor = () => editor.value.chain().focus().run();

watchDebounced(
  content,
  async () => storeContent(store.currentDate, content.value),
  { debounce: 500, maxWait: 1500 }
);

onBeforeUnmount(() => console.log("destroying"));
</script>

<template>
  <div
    class="px-10 mt-5 text-gray-400 dark:text-gray-500 relative flex-grow cursor-text"
    @click="focusEditor"
  >
    <div class="text-black dark:text-white">
      <editor-content class="pb-10" :editor="editor" v-model="content" />
    </div>
  </div>
</template>

<style>
.ProseMirror:focus {
  @apply outline-none;
}
</style>
