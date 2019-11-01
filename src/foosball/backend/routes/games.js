const router = require('express').Router()
const { GamesController } = require(`../controllers`)

router.get('/', GamesController.all)
router.get('/:id', GamesController.one)

module.exports = router;