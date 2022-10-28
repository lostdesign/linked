import tippy from 'tippy.js'
import { VueRenderer } from '@tiptap/vue-2'
import CommandsList from './CommandsList.vue'
import { translate } from '../../translation'

export default {
  items: async ({ query }) => {
    const translationKey = 'commands.blocks'
    
    return [
      {
        title: await translate(`${translationKey}.h1.title`),
        icon: 'heading-one',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
        },
      },
      {
        title: await translate(`${translationKey}.h2.title`),
        icon: 'heading-two',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
        },
      },
      {
        title: await translate(`${translationKey}.h3.title`),
        icon: 'heading-three',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
        },
      },
      {
        title: await translate(`${translationKey}.bold.title`),
        icon: 'bold',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('bold').run()
        },
      },
      {
        title: await translate(`${translationKey}.italic.title`),
        icon: 'italic',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('italic').run()
        },
      },
      {
        title: await translate(`${translationKey}.unorderedList.title`),
        icon: 'bullet-list',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
      },
      {
        title: await translate(`${translationKey}.task.title`),
        icon: 'check-box',
        command: ({editor, range}) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run()
        }
      },
      {
        title: await translate(`${translationKey}.codeBlock.title`),
        icon: 'code-block',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setCodeBlock().run()
        },
      },
      {
        title: await translate(`${translationKey}.divider.title`),
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