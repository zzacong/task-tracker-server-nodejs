const express = require('express')
const logger = require('./middleware/logger')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// MONGODB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const conn = mongoose.connection
conn.once('open', () => console.log('MongoDB connected'))
conn.on('error', () => console.error(error))

// MIDDLEWARE
app.use(express.json())
app.use(logger)

// ROUTES
app.use('/tasks', require('./routes/task'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
)
