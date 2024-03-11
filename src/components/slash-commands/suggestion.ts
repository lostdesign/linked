import tippy from 'tippy.js'
import CommandsList from './commands-list.vue'
import { VueRenderer } from "@tiptap/vue-3";

export default {
  items: async ({ query }) => {
    const translationKey = 'commands.blocks'

    console.log('items query')

    return [
      {
        title: '.h1.title',
        icon: 'heading-one',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
        },
      },
      {
        title: '.h2.title',
        icon: 'heading-two',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
        },
      },
      {
        title: '.h3.title',
        icon: 'heading-three',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
        },
      },
      {
        title: '.bold.title',
        icon: 'bold',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('bold').run()
        },
      },
      {
        title: '.italic.title',
        icon: 'italic',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('italic').run()
        },
      },
      {
        title: '.unorderedList.title',
        icon: 'bullet-list',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
      },
      {
        title: '.task.title',
        icon: 'check-box',
        command: ({editor, range}) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run()
        }
      },
      {
        title: '.codeBlock.title',
        icon: 'code-block',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setCodeBlock().run()
        },
      },
      {
        title: '.divider.title',
        icon: 'divider',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run()
        },
      }
    ].filter(item => {
      return (
        item.title?.toLowerCase().includes(query.toLowerCase())
        || item.description?.toLowerCase().includes(query.toLowerCase())
      )
    }).slice(0, 10)
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        component = new VueRenderer(CommandsList, {
          propsData: props,
          editor: props.editor,
        })
        console.log('onstart')

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        console.log('onupdate')
        component.updateProps(props)

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        console.log('onkeydown')
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}