class KeyArr {
  constructor () {
      this.users = {
          required: ['first_name', 'last_name'],
          optional: []
      }

      this.games = {
          required: ['red_def', 'red_off', 'black_def', 'black_off', 'red_points', 'black_points'],
          optional: []
      }
  }

  postPrune (type) {
      return this[type].required.concat(this[type].optional)
  }

  postComplete (type) {
      return this[type].required
  }

  putPrune(type) {
      return this[type].required.concat(this[type].optional)
  }

  putComplete(type) {
      return this[type].required
  }
}



module.exports = new KeyArr()