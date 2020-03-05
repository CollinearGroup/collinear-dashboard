const router = require('express').Router()
const Keys = require('../required-fields')
const { KudosController } = require(`../controllers`)

router.get('/', KudosController.all)
router.get('/:id', KudosController.one)

router.post('/', KudosController.prune(Keys.postPrune('kudos')), KudosController.complete(Keys.postComplete('kudos')), KudosController.create)

module.exports = router;