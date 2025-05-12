const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		login: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
)

userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
	user.tokens = user.tokens.concat({ token })
	await user.save()
	return token
}

module.exports = mongoose.model('User', userSchema)
