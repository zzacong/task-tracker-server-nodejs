const express = require('express')
const Task = require('../models/Task.model')

const router = express.Router()

// GET All tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find({})
  res.send(tasks)
})

// GET One task
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findById(id)
    if (!task) return res.status(404).send({ error: `No task with id ${id}` })
    console.log(task)
    res.send(task)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// POST Create a task
router.post('/', async (req, res) => {
  const { text, day, reminder } = req.body

  if (!text || !day)
    return res
      .status(400)
      .send({ error: 'Please provide text, day and reminder' })

  const task = new Task({
    text,
    day,
    reminder: reminder ?? false,
  })

  await task.save()
  console.log(task)
  res.status(201).send(task)
})

// PUT Update a task
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { text, day, reminder } = req.body

  try {
    const task = await Task.findById(id)
    if (!task)
      return res.status(404).send({ error: `No task with the id ${id}` })

    task.text = text ?? task.text
    task.day = day ?? task.day
    task.reminder = reminder ?? task.reminder

    // const updatedTask = await task.save()
    await task.save()
    res.send(task)
  } catch (error) {
    res.status(500).send(error.message)
  }

  // try {
  //   const updated = await Task.updateOne(
  //     { _id: id },
  //     { text, day, reminder },
  //     { omitUndefined: true } // delete any properties whose value is undefined
  //   )
  //   if (!updated.n) return res.status(404).json(null)

  //   console.log('updated')
  //   res.json(await Task.findById(id))
  // } catch (error) {
  //   console.log(error.message)
  //   res.status(500).json({ error: error.message })
  // }
})

// DELETE Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await Task.deleteOne({ _id: id })
    if (!deleted.deletedCount) return res.status(404).send(false)

    console.log('deleted')
    return res.send(true)
  } catch (error) {
    console.log(error.message)
    return res.status(500).send({ error: error.message })
  }
})

module.exports = router
