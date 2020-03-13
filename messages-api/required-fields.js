class KeyArr {
  constructor() {
    this.messages = {
      required: ["text", "from", "show_from", "show_to"],
      optional: []
    }

    this.kudos = {
      required: ["text", "from"],
      optional: []
    }
  }

  postPrune(type) {
    return this[type].required.concat(this[type].optional)
  }

  postComplete(type) {
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
