const router = require('express').Router()
const { GamesController } = require(`../controllers`)

router.get('/', GamesController.all)
router.get('/:id', GamesController.one)

//TODO: reorderd this so updateGamesPlayed happens after the game is in the database?
router.post('/', GamesController.updateElos, GamesController.updateGamesPlayed, GamesController.create)

module.exports = router;