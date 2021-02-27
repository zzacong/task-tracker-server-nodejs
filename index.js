const express = require('express')
const logger = require('./middleware/logger')
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(logger)

// ROUTES
app.use('/tasks', require('./routes/task'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
)
