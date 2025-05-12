const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

router.post('/create', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/logout', auth, userController.logoutUser)
// router.get('/get/:id', auth, userController.getUser)
// router.patch('/update/:id', auth, userController.updateUser)
// router.delete('/delete/:id', auth, userController.deleteUser)

module.exports = router
