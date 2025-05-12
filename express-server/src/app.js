const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const teamRouter = require('./routes/teamRoute')
const playerRouter = require('./routes/playerRoute')
const userRouter = require('./routes/userRoute')

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Добавляем статическую папку для изображений
const uploadsDir = path.join(__dirname, 'uploads')
app.use('/uploads', express.static(uploadsDir))

// Создаем папку uploads если ее нет
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true })
}

app.use('/api/teams', teamRouter)
app.use('/api/players', playerRouter)
app.use('/api/users', userRouter)

mongoose
	.connect(process.env.MONGO)
	.then(() =>
		app.listen(PORT, () => {
			console.log(`App is up on port ${PORT}`)
		})
	)
	.catch(err => console.log(`error to connection: ${err}`))
