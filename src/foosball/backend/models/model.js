const db = require('../database/connection')

module.exports = (tableName) => {
    class Model {
        static all() {
            return db(tableName)
        }

        static one(id) {
            return db(tableName).where({ id }).first()
        }

        static create(body) {
            return db(tableName).insert(body).returning('*').then(([res]) => res)
        }

        static update(id, body) {
            return db(tableName).update(body).where({ id }).returning('*').then(([res]) => res)
        }

        static delete(id) {
            return db(tableName).del().where({ id }).returning('*').then(([res]) => res)
        }

        static allMatchingFrom(tableName, key, value) {
            return db(tableName).where({ [key]: value })
        }

    }

    return Model
}