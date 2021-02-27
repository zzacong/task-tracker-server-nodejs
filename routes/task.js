const express = require('express')
const tasks = require('../data')

const router = express.Router()

// GET All tasks
router.get('/', (req, res) => {
  res.send(tasks)
})

// GET One task
// GET /tasks/:id
router.get('/:id', (req, res) => {
  const { id } = req.params

  const task = tasks.find(task => task.id === +id)
  console.log(task)
  res.send(task)
})

// POST Create a task
router.post('/', (req, res) => {
  const { text, day, reminder } = req.body

  if (!text || !day || !reminder)
    return res
      .status(400)
      .send({ error: 'Please provide text, day and reminder' })

  const lastId = tasks.slice(-1)[0].id
  const newId = lastId + 1

  const task = {
    id: newId,
    text,
    day,
    reminder,
  }

  tasks.push(task)
  console.log(task)
  res.status(201).send(task)
})

// PUT Update a task
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { text, day, reminder } = req.body

  const found = tasks.some(task => task.id === +id)

  if (!found) return res.status(404).send({ error: `No task with id ${id}` })

  tasks.forEach(task => {
    if (task.id === +id) {
      task = {
        id,
        text: text ?? task.text,
        day: day ?? task.day,
        reminder: reminder ?? task.reminder,
      }
    }
  })

  res.send(updatedTask)
})

// DELETE Delete a task
router.delete('/:id', (req, res) => {
  const { id } = req.params
  let index = tasks.findIndex(task => task.id === +id)
  if (index < 0) return res.status(404).send(false)

  tasks.splice(index, 1)
  res.send(true)
})

module.exports = router
