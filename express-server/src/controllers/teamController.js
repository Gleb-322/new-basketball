const Player = require('../models/player')
const Team = require('../models/team')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

// create team
exports.createTeam = async (req, res) => {
	try {
		// Check if team already exists
		const existTeam = await Team.findOne({
			name: req.body.teamName,
		})

		if (existTeam) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'This Team already exist!',
			})
		}

		// Validate image
		if (req.errorImage) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: req.errorImage,
			})
		}

		// Process and save image
		const filename = `team-${Date.now()}${path.extname(req.file.originalname)}`
		const filepath = path.join(__dirname, '../uploads', filename)

		await sharp(req.file.buffer)
			.resize({ width: 210, height: 210 })
			.png()
			.toFile(filepath)

		// Create new team
		const newTeam = await Team.create({
			name: req.body.teamName,
			division: req.body.teamDivision,
			conference: req.body.teamConference,
			year: req.body.teamYear,
			teamImg: `/uploads/${filename}`,
		})

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: {
				team: newTeam,
			},
		})
	} catch (err) {
		return res.status(500).send({
			errorCode: '500',
			success: false,
			message: err.message,
		})
	}
}

// get teams
exports.getTeams = async (req, res) => {
	try {
		const page = parseInt(req.query.page)
		const limit = parseInt(req.query.limit)
		const startIndex = (page - 1) * limit

		// Build query
		let query = {}

		// Filter teams by keyword
		if (req.query.keyword && req.query.keyword.trim() !== '') {
			const keyword = req.query.keyword.trim()
			query.$or = [
				{ name: new RegExp(keyword, 'i') },
				{
					year: new RegExp(keyword, 'i'),
				},
			]
		}

		// Get teams with pagination
		const teams = await Team.find(query)
			.populate('players')
			.limit(limit)
			.skip(startIndex)
			.sort({ createdAt: -1 })

		if (!teams) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'The Teams could not be found!',
			})
		}

		// Count total teams
		const countTeams = await Team.countDocuments(query)

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: { teams, countTeams },
		})
	} catch (err) {
		return res.status(500).send({
			errorCode: '500',
			success: false,
			message: err.message,
		})
	}
}

// get one team by id
exports.getTeam = async (req, res) => {
	try {
		// Find team
		const team = await Team.findById(req.params.id).populate('players')

		if (!team) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'The Team could not be found!',
			})
		}

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: team,
		})
	} catch (err) {
		return res.status(500).send({
			errorCode: '500',
			success: false,
			message: err.message,
		})
	}
}

// update one team by id
exports.updateTeam = async (req, res) => {
	try {
		// Find team
		const team = await Team.findById(req.body.teamId)
		if (!team) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'This Team could not be found!',
			})
		}

		// Prepare update data
		const updateBody = {
			name: req.body.teamName,
			division: req.body.teamDivision,
			conference: req.body.teamConference,
			year: req.body.teamYear,
		}

		// Handle image update
		if (req.file) {
			if (req.errorImage) {
				return res.status(200).send({
					errorCode: '200',
					success: false,
					message: req.errorImage,
				})
			}

			// Delete old image if exists
			if (team.teamImg) {
				const oldFilePath = path.join(__dirname, '..', team.teamImg)
				if (fs.existsSync(oldFilePath)) {
					fs.unlinkSync(oldFilePath)
				}
			}

			// Save new image
			const filename = `team-${Date.now()}${path.extname(
				req.file.originalname
			)}`
			const filepath = path.join(__dirname, '../uploads', filename)

			await sharp(req.file.buffer)
				.resize({ width: 210, height: 210 })
				.png()
				.toFile(filepath)

			updateBody.teamImg = `/uploads/${filename}`
		}

		// Update team
		const updateTeam = await Team.findOneAndUpdate(
			{
				_id: req.body.teamId,
			},
			updateBody,
			{ upsert: true, returnDocument: 'after' }
		).populate('players')

		if (!updateTeam) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'The Team could not be updated!',
			})
		}

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: updateTeam,
		})
	} catch (err) {
		return res.status(500).send({
			errorCode: '500',
			success: false,
			message: err.message,
		})
	}
}

// delete one team by id
exports.deleteTeam = async (req, res) => {
	try {
		// Find team
		const team = await Team.findById(req.params.id)

		if (!team) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'This Team could not be found!',
			})
		}

		// Delete team image if exists
		if (team.teamImg) {
			const filePath = path.join(__dirname, '..', team.teamImg)
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath)
			}
		}

		// Delete all players and their images
		const players = await Player.find({ _id: { $in: team.players } })
		for (const player of players) {
			if (player.playerImg) {
				const playerImgPath = path.join(__dirname, '..', player.playerImg)

				if (fs.existsSync(playerImgPath)) {
					fs.unlinkSync(playerImgPath)
				}
			}
		}

		await Player.deleteMany({ _id: { $in: team.players } })

		if (!players) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'Failed to remove Players from the Team!',
			})
		}

		// Delete team
		const deleteTeam = await Team.deleteOne({
			_id: req.params.id,
		})

		if (!deleteTeam) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: `Couldn't delete the Team!`,
			})
		}
		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: `The ${team.name} Team has been successfully removed!`,
		})
	} catch (err) {
		return res.status(500).send({
			errorCode: '500',
			success: false,
			message: err.message,
		})
	}
}
