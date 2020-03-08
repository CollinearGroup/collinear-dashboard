const router = require("express").Router()
const Keys = require("../required-fields")
const { MessagesController } = require(`../controllers`)
const { validateAuthMiddleware } = require("../src/authUtil")

router.get("/", MessagesController.all)
router.get("/:id", MessagesController.one)

router.post(
  "/",
  validateAuthMiddleware,
  MessagesController.prune(Keys.postPrune("messages")),
  MessagesController.complete(Keys.postComplete("messages")),
  MessagesController.create
)

module.exports = router
