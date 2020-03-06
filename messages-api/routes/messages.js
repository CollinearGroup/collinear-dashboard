const router = require("express").Router()
const Keys = require("../required-fields")
const { MessagesController } = require(`../controllers`)

router.get("/", MessagesController.all)
router.get("/:id", MessagesController.one)

router.post(
  "/",
  MessagesController.prune(Keys.postPrune("messages")),
  MessagesController.complete(Keys.postComplete("messages")),
  MessagesController.create
)

module.exports = router
