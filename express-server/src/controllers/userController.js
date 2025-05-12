const User = require('../models/user')
const bcrypt = require('bcryptjs')

// create user
exports.createUser = async (req, res) => {
	try {
		const existUser = await User.findOne({
			login: req.body.loginSignup,
		})

		if (existUser) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'This User already exist!',
			})
		}

		const hashPassword = await bcrypt.hash(req.body.passwordSignup, 8)

		const newUser = await User.create({
			name: req.body.nameSignup,
			login: req.body.loginSignup,
			password: hashPassword,
		})

		const token = await newUser.generateAuthToken()

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: {
				user: newUser,
				token,
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

// login user
exports.loginUser = async (req, res) => {
	try {
		const user = await User.findOne({
			login: req.body.loginSignin,
		})

		if (!user) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'Wrong Login or User does`t exist!',
			})
		}

		const isMatch = await bcrypt.compare(req.body.passwordSignin, user.password)

		if (!isMatch) {
			return res.status(200).send({
				errorCode: '200',
				success: false,
				message: 'Wrong Password or User does`t exist!',
			})
		}

		const token = await user.generateAuthToken()

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: {
				user,
				token,
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
// logout user
exports.logoutUser = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)

		await req.user.save()

		return res.status(200).send({
			errorCode: '200',
			success: true,
			message: 'You succesfully logout!',
		})
	} catch (err) {
		return res.status(500).send({
			errorCode: '500',
			success: false,
			message: err.message,
		})
	}
}

// get user by id
// exports.getUser = async (req, res) => {
// 	try {
// 		return res.status(200).send({
// 			errorCode: '200',
// 			success: true,
// 			message: req.user,
// 		})
// 	} catch (err) {
// 		return res.status(500).send({
// 			errorCode: '500',
// 			success: false,
// 			message: err.message,
// 		})
// 	}
// }

// // update user by id
// exports.updateUser = async (req, res) => {
// 	try {
// 		const updateUser = await User.findOneAndUpdate(
// 			{ _id: req.user._id },
// 			req.body,
// 			{
// 				upsert: true,
// 				returnDocument: 'after',
// 			}
// 		)
// 		if (!updateUser) {
// 			return res.status(200).send({
// 				errorCode: '200',
// 				success: false,
// 				message: 'Не удалось обновить пользователя',
// 			})
// 		}

// 		return res.status(200).send({
// 			errorCode: '200',
// 			success: true,
// 			message: updateUser,
// 		})
// 	} catch (err) {
// 		return res.status(500).send({
// 			errorCode: '500',
// 			success: false,
// 			message: err.message,
// 		})
// 	}
// }

// // delete user by id
// exports.deleteUser = async (req, res) => {
// 	try {
// 		const deleteUser = await User.deleteOne({ _id: req.user._id })
// 		if (!deleteUser) {
// 			return res.status(200).send({
// 				errorCode: '200',
// 				success: false,
// 				message: 'Не удалось удалить аккаунт',
// 			})
// 		}

// 		return res.status(200).send({
// 			errorCode: '200',
// 			success: true,
// 			message: 'Вы удалил свой аккаунт',
// 		})
// 	} catch (err) {
// 		return res.status(500).send({
// 			errorCode: '500',
// 			success: false,
// 			message: err.message,
// 		})
// 	}
// }
