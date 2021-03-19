export default {
  data () {
    return {
      today: this.formatDate(new Date(), 'year-mm-dd')
    }
  },
  methods: {
    /**
     * Set the current day by click.
     * @param {*} day
     * @returns
     */
    setDay(day) {
      this.today = this.formatDate(day, 'year-mm-dd')
    },
    /**
     * Takes in any integer and shifts the date by the value of the integer. Returns a normal date string.
     * @param {number} day
     * @param {string} date
     * @returns {string} date
     */
     shiftDay(date, day) {
      return new Date(date).setDate(new Date(date).getDate() + day)
    },
    /**
     * Returns an array of date strings in YYYY-mm-dd for the current active week
     */
     currentWeek() {
      const curr = new Date(this.today)
      let week = []

      for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i 
        week.push(new Date(curr.setDate(first)).toISOString().slice(0, 10))
      }

      return week
    },
    /**
     * Format a date into any string.
     * @param {string} date
     * @param {string} format
     * @returns {string}
     */
    formatDate(date, format) {
      const dt = new Date(date)
      const map = {
          mm: dt.getMonth() + 1,
          dd: dt.getDate(),
          yy: dt.getFullYear().toString().slice(-2),
          year: dt.getFullYear()
      }

      return format.replace(/mm|dd|yy|year/gi, matched => map[matched])
    },
    /**
     * Takes an array and two indexes to return a new spliced array by given indexes.
     * @param {array} array
     * @param {integer} from
     * @param {integer} to
     */
     returnDatesArrayFromTo(array, from, to) {
      return array.slice(from,to)
    },
  },
  watch: {
    today(newDate, oldDate) {
      this.date = this.formatDate(newDate, 'year-mm-dd')
      this.loadFile()
    }
  }
}