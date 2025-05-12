const mongoose = require('mongoose')

const Schema = mongoose.Schema

const teamSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		division: {
			type: String,
			required: true,
		},
		conference: {
			type: String,
			required: true,
		},
		year: {
			type: String,
			required: true,
		},
		teamImg: {
			type: String,
			required: true,
		},
		players: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Player',
			},
		],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Team', teamSchema)
