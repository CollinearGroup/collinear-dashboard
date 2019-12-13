class KeyArr {
    constructor() {
        this.messages = {
            required: ['poster_first_name', 'poster_last_name', 'message'],
            optional: []
        }

        this.kudos = {
            required: ['poster_first_name', 'poster_last_name', 'message'],
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