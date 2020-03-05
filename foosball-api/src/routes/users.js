const router = require('express').Router()
const Keys = require('../required-fields')
const { UsersController } = require(`../controllers`)

router.get('/', UsersController.all)
router.get('/:id', UsersController.one)

router.post('/', UsersController.prune(Keys.postPrune('users')), UsersController.complete(Keys.postComplete('users')), UsersController.create)

module.exports = router;