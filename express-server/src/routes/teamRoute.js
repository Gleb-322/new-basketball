const express = require('express')
const router = express.Router()
const teamController = require('../controllers/teamController')
const multer = require('multer')
const auth = require('../middleware/auth')

const fileSize = 1500000

const upload = multer({
	limits: {
		fileSize,
	},
	fileFilter(req, file, cb) {
		console.log(file.originalname)
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
	upload.single('teamImage'),
	teamController.createTeam
)
router.get('/get', teamController.getTeams)
router.get('/get/:id', teamController.getTeam)
router.patch(
	'/update',
	auth,
	upload.single('teamImage'),
	teamController.updateTeam
)
router.delete('/delete/:id', auth, teamController.deleteTeam)

module.exports = router
