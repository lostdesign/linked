export default {
  data() {
    return {
      content: null
    }
  },
  methods: {
    async saveFile() {
      await window.electron.invoke('save-file', [
        this.formatDate(this.today, 'year'),
        this.today,
        this.content
      ])
    },
    async loadFile() {
      await window.electron.invoke('load-file', [
        this.formatDate(this.today, 'year'),
        this.today
      ]).then(data => {
        this.content = data
      })
    },
    debounce(func, wait) {
      let timeout;

      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      }
    }
  },
  created() {
    this.loadFile()
  }
}