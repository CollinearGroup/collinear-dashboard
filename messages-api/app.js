const environment = process.env.NODE_ENV || "development"
const db = require("./knexfile")[environment]
const knex = require("knex")(db)
knex.migrate
  .latest()
  .then(() => {
    if (environment === "development") {
      return knex.seed.run()
    }
  })
  .catch(error => {
    console.log(error)
  })

const express = require("express")
const app = express()
const port = process.env.PORT || 8000

const cors = require("cors")
const morgan = require("morgan")

const { MessagesRouter: messages } = require("./routes")
const { addBodyBufferOptions } = require("./src/authUtil")

app.use(cors())
app.use(express.json(addBodyBufferOptions))
app.use(morgan("dev"))

app.use("/api/messages", messages)

app.use((req, res) => {
  const status = 404
  const message = `${req.method} route for ${req.path} not found.`
  res.status(status).json({ status, message })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  const status = err.status || 500
  const message = err.message || "Something went wrong!"
  res.status(status).json({ message, status })
})

app.listen(port, () => {
  console.log("listening on port", port)
})
