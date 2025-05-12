const mongoose = require('mongoose')

const Schema = mongoose.Schema

const playerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			required: true,
		},

		team: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
		},
		height: {
			type: String,
			required: true,
		},
		weight: {
			type: String,
			required: true,
		},
		birthday: {
			type: Date,
			required: true,
		},
		number: {
			type: String,
		},
		playerImg: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Player', playerSchema)

// playerSchema.methods.toJSON = function () {
// 	const player = this
// 	const plyerObject = player.toObject()

// 	delete plyerObject.playerImg

// 	return plyerObject
// }
