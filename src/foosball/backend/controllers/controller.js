module.exports = name => {
  const Model = require(`../models/${name}.js`)


  class Controller {
      static all(req, res, next) {
          Model.all().then(response => {
              res.json({
                  [name]: response
              })
          })
      }

      static one(req, res, next) {
          Model.one(req.params.id).then(response => {
              res.json({
                  [name]: response
              })
          })
      }

      static create(req, res, next) {
          Model.create(req.body).then(response => {
              res.status(201).json({
                  [name]: response
              })
          })
      }

      static update(req, res, next) {
          Model.update(req.params.id, req.body).then(response => {
              res.json({
                  [name]: response
              })
          })
      }

      static delete(req, res, next) {
          Model.delete(req.params.id).then(response => {
              res.json({
                  [name]: response
              })
          })
      }
  }

  return Controller
}