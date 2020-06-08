const router = require('express').Router()
const Keys = require('../required-fields')
const { GamesController } = require(`../controllers`)
const checkAuth = require('../controllers/auth');

router.get('/', GamesController.all)
router.get('/:id', GamesController.one)

//TODO: reorder this so updateGamesPlayed happens after the game is in the database?
router.post('/', checkAuth, GamesController.prune(Keys.postPrune('games')), GamesController.complete(Keys.postComplete('games')), GamesController.updateElos, GamesController.updateGamesPlayed, GamesController.create)

module.exports = router;