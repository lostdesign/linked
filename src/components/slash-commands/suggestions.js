import tippy from 'tippy.js'
import { VueRenderer } from '@tiptap/vue-2'
import CommandsList from './CommandsList.vue'

export default {
  items: ({ query }) => {
    return [
      {
        title: 'Heading H1',
        description: 'First level heading',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
        },
      },
      {
        title: 'Heading H2',
        description: 'commands.no_result',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
        },
      },
      {
        title: 'Heading H3',
        description: 'Third level heading',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
        },
      },
      {
        title: 'Bold',
        description: 'Write your text in bold',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('bold').run()
        },
      },
      {
        title: 'Italic',
        description: 'Write your text in italic',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('italic').run()
        },
      },
      {
        title: 'Code Block',
        description: 'Inserts a generic code block',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setCodeBlock().run()
        },
      },
      {
        title: 'Unordered List',
        description: 'Adds a unordered list',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
      },
      {
        title: 'Task List',
        description: 'Adds a Task List',
        command: ({editor, range}) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run()
        }
        
      },
      {
        title: 'Detail Block',
        description: 'Adds a detail block',
        command: ({editor, range}) => {
          editor.chain().focus().deleteRange(range).setDetails().run()
        }
      }
    ].filter(item => {
      return (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
    }).slice(0, 10)
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        component = new VueRenderer(CommandsList, {
          parent: this,
          propsData: props,
          editor: props.editor,
        })

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
        component.updateProps(props)

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
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