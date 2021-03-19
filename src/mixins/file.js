const fs = window.require('fs')
const path = window.require('path')
const remote = window.require('electron').remote
const app = remote.app

export default {
  data () {
    return {
      basePath: `${app.getPath('documents')}/linked`,
      content: 'Loading...'
    }
  },
  methods: {
    async loadFile() {
      await fs.promises.readFile(this.currentFilePath, 'utf8')
        .then(e => this.content = e)
        .catch(e => this.createFile())
    },
    async createFile() {
      await fs.promises.mkdir(path.dirname(this.currentFilePath), {recursive: true})
        .then(x => fs.promises.writeFile(this.currentFilePath, this.content))
    },
  },
  computed: {
    currentFilePath() {
      return `${this.basePath}/${this.formatDate(this.today, 'year')}/${this.formatDate(this.today, 'year-mm-dd')}.md`
    },
  }
}