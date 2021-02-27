const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    // text: String,  -- Short hand way
    day: {
      type: String,
      required: true,
    },
    reminder: {
      type: Boolean,
      required: true,
    },
    // createdAt: {
    //   type: Date,
    //   default: new Date()
    // }
  },
  { timestamps: true } // createdAt & updatedAt
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
