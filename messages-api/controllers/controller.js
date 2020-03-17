const format = require('date-fns/format')
const addDays = require('date-fns/addDays')
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
      const messageOrKudosData = setDefaultShowDateStrings(req.body)
      Model.create(messageOrKudosData).then(response => {
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

    static complete(requiredArr) {
      return function(req, res, next) {
        let errors = requiredArr.filter(key => {
          return req.body[key] === undefined
        })
        let keyWordLiterally = "key"
        if (errors.length > 1) {
          errors[errors.length - 1] = "and " + errors[errors.length - 1]
          if (errors.length > 2) {
            errors = errors.join(", ")
          } else {
            errors = errors.join(" ")
          }
          keyWordLiterally += "s"
        } else {
          errors = errors[0]
        }
        if (errors) {
          return next({
            status: 400,
            message: `Request body missing ${errors} ${keyWordLiterally}`
          })
        } else {
          next()
        }
      }
    }

    static prune(requiredArr) {
      return function(req, res, next) {
        for (let key in req.body) {
          if (!requiredArr.includes(key)) {
            delete req.body[key]
          }
        }
        next()
      }
    }
  }

  return Controller
}

const setDefaultShowDateStrings = requestBody => {
  const payloadBodyWithDefaults = {
    ...requestBody
  }
  if (!payloadBodyWithDefaults.show_from) {
    payloadBodyWithDefaults.show_from = format(new Date(), "yyyy-MM-dd")
  }
  if (!payloadBodyWithDefaults.show_to) {
    const showToDate = addDays(new Date(payloadBodyWithDefaults.show_from), 5)
    payloadBodyWithDefaults.show_to = format(showToDate, "yyyy-MM-dd")
  }
  return payloadBodyWithDefaults
}