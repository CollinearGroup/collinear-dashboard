const router = require('express').Router()
const { UsersController } = require(`../controllers`)

router.get('/', UsersController.all)
router.get('/:id', UsersController.one)

router.post('/', UsersController.create)

module.exports = router;