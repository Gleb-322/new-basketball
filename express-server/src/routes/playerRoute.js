const express = require('express')
const router = express.Router()
const multer = require('multer')
const playerController = require('../controllers/playerController')
const auth = require('../middleware/auth')

const fileSize = 1500000

const upload = multer({
	limits: {
		fileSize,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			cb(undefined, false)
			req.errorImage = 'The file is not an image!'
		}
		cb(undefined, true)
	},
})

router.post(
	'/create',
	auth,
	upload.single('playerImage'),
	playerController.createPlayer
)
router.get('/get', playerController.getPlayers)
router.get('/get/:id', playerController.getPlayer)
router.patch(
	'/update',
	auth,
	upload.single('playerImage'),
	playerController.updatePlayer
)
router.delete('/delete', auth, playerController.deletePlayer)

module.exports = router
