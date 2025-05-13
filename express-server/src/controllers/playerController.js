const sharp = require('sharp')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const Player = require('../models/player')
const Team = require('../models/team')

// create player
exports.createPlayer = async (req, res) => {
	try {
		// Check if player already exists
		const existPlayer = await Player.findOne({
			name: req.body.playerName,
		})

		if (existPlayer) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'This Player already exist!',
			})
		}

		// Prepare create data
		const createBody = {
			name: req.body.playerName,
			position: req.body.playerPosition,
			team: req.body.teamId,
			height: req.body.playerHeight,
			weight: req.body.playerWeight,
			birthday: req.body.playerBirthday,
		}

		// Validate image
		if (req.file) {
			if (req.errorImage) {
				return res.status(200).send({
					errorCode: '200',
					success: false,
					message: req.errorImage,
				})
			}

			// Process and save image
			const filename = `player-${Date.now()}${path.extname(
				req.file.originalname
			)}`
			const filepath = path.join(__dirname, '../uploads', filename)

			await sharp(req.file.buffer)
				.resize({ width: 530, height: 460 })
				.png()
				.toFile(filepath)

			createBody.playerImg = `/uploads/${filename}`
		}

		// Validate player number
		if (req.body.playerNumber) {
			createBody.number = req.body.playerNumber
		}

		// Create new player
		const newPlayer = await Player.create(createBody)

		// Add player to team
		const team = await Team.findById(req.body.teamId)

		if (!team) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'The Team could not be found!',
			})
		}

		team.players.push(newPlayer._id)
		await team.save()

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: {
				player: newPlayer,
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

// get players
exports.getPlayers = async (req, res) => {
	try {
		const page = parseInt(req.query.page)
		const limit = parseInt(req.query.limit)
		const startIndex = (page - 1) * limit

		// Build query
		let query = {}
		const teamFilter = req.query.filters

		// Filter players by keyword
		if (req.query.keyword && req.query.keyword.trim() !== '') {
			const keyword = req.query.keyword.trim()
			query.$or = [{ name: new RegExp(keyword, 'i') }]
		}

		// Filter players by teams
		if (teamFilter) {
			// Converting to an array regardless of type
			const teamIds = typeof teamFilter === 'string' ? [teamFilter] : teamFilter

			// Creating the ObjectId array directly
			const validTeamIds = teamIds
				.map(id => {
					try {
						return mongoose.Types.ObjectId.createFromHexString(id)
					} catch (error) {
						return null
					}
				})
				.filter(id => id !== null)

			// If there are valid IDs, add a filter by teams
			if (validTeamIds.length > 0) {
				query.team = { $in: validTeamIds }
			}
		}

		// Get players with pagination
		const players = await Player.find(query)
			.populate('team')
			.limit(limit)
			.skip(startIndex)
			.sort({ createdAt: -1 })

		if (!players) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'The Players could not be found!',
			})
		}

		// Count total players
		const countPlayers = await Player.countDocuments(query)

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: { players, countPlayers },
		})
	} catch (err) {
		return res.status(500).send({
			errorCode: '500',
			success: false,
			message: err.message,
		})
	}
}

// get one player by id
exports.getPlayer = async (req, res) => {
	try {
		// Find player
		const player = await Player.findById(req.params.id).populate('team')

		if (!player) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'The Player could not be found!',
			})
		}

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: player,
		})
	} catch (err) {
		return res.status(500).send({
			errorCode: '500',
			success: false,
			message: err.message,
		})
	}
}

// update player by id
exports.updatePlayer = async (req, res) => {
	try {
		const player = await Player.findById(req.body.playerId)
		if (!player) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'This Player could not be found!',
			})
		}

		// Prepare update data
		const updateBody = {
			name: req.body.playerName,
			position: req.body.playerPosition,
			height: req.body.playerHeight,
			weight: req.body.playerWeight,
			birthday: req.body.playerBirthday,
		}

		// Handle number update
		if (req.body.playerNumber) {
			updateBody.number = req.body.playerNumber
		} else if (req.body.removeNumber === 'true') {
			await Player.updateOne(
				{ _id: req.body.playerId },
				{ $unset: { number: '' } }
			)
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
			if (player.playerImg) {
				const oldPath = path.join(__dirname, '..', player.playerImg)
				if (fs.existsSync(oldPath)) {
					fs.unlinkSync(oldPath)
				}
			}

			// Save new image
			const filename = `player-${Date.now()}${path.extname(
				req.file.originalname
			)}`
			const filepath = path.join(__dirname, '../uploads', filename)

			await sharp(req.file.buffer)
				.resize({ width: 530, height: 460 })
				.png()
				.toFile(filepath)

			updateBody.playerImg = `/uploads/${filename}`
		} else if (req.body.removeImage === 'true') {
			// Remove existing image
			if (player.playerImg) {
				const oldPath = path.join(__dirname, '..', player.playerImg)
				if (fs.existsSync(oldPath)) {
					fs.unlinkSync(oldPath)
				}
			}

			await Player.updateOne(
				{ _id: req.body.playerId },
				{ $unset: { playerImg: '' } }
			)
		}

		// Handle team change
		if (!req.body.newTeamId) {
			updateBody.team = req.body.oldTeamId

			const updatePlayer = await Player.findOneAndUpdate(
				{
					_id: req.body.playerId,
				},
				updateBody,
				{ upsert: true, returnDocument: 'after' }
			).populate('team')

			if (!updatePlayer) {
				return res.status(200).send({
					errorCode: '200',
					success: false,
					message: 'The Player could not be updated!',
				})
			}

			return res.status(200).send({
				errorCode: '200',
				success: true,
				message: updatePlayer,
			})
		} else {
			const oldTeam = await Team.findById(req.body.oldTeamId)

			oldTeam.players = oldTeam.players.filter(
				player => !player.equals(req.body.playerId)
			)
			await oldTeam.save()

			updateBody.team = req.body.newTeamId

			const updatePlayer = await Player.findOneAndUpdate(
				{
					_id: req.body.playerId,
				},
				updateBody,
				{ upsert: true, returnDocument: 'after' }
			).populate('team')

			if (!updatePlayer) {
				return res.status(200).send({
					errorCode: '200',
					success: false,
					message: 'The Player could not be updated!',
				})
			}

			const newTeam = await Team.findById(req.body.newTeamId)
			newTeam.players.push(updatePlayer._id)
			await newTeam.save()

			return res.status(200).send({
				errorCode: '200',
				success: true,
				message: updatePlayer,
			})
		}
	} catch (err) {
		return res.status(500).send({
			errorCode: '500',
			success: false,
			message: err.message,
		})
	}
}

// delete player by id
exports.deletePlayer = async (req, res) => {
	try {
		// Find player
		const player = await Player.findById(req.query.playerId)
		if (!player) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'This Player could not be found!',
			})
		}

		// Remove player image if exists
		if (player.playerImg) {
			const filePath = path.join(__dirname, '..', player.playerImg)
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath)
			}
		}

		// Remove player from team
		const team = await Team.findById(req.query.teamId)

		if (!team) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'This Team could not be found!',
			})
		}

		team.players = team.players.filter(
			player => !player.equals(req.query.playerId)
		)
		await team.save()

		// Delete player
		const deletePlayer = await Player.deleteOne({
			_id: req.query.playerId,
		})

		if (!deletePlayer) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: `Couldn't delete the Player!`,
			})
		}

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: `The Player with name ${player.name} has been successfully removed!`,
		})
	} catch (err) {
		return res.status(500).send({
			errorCode: '500',
			success: false,
			message: err.message,
		})
	}
}
