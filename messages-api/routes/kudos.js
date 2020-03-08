const router = require("express").Router()
const Keys = require("../required-fields")
const { KudosController } = require(`../controllers`)
const { validateAuthMiddleware } = require("../src/authUtil")

router.get("/", KudosController.all)
router.get("/:id", KudosController.one)

router.post(
  "/",
  validateAuthMiddleware,
  KudosController.prune(Keys.postPrune("kudos")),
  KudosController.complete(Keys.postComplete("kudos")),
  KudosController.create
)

module.exports = router
