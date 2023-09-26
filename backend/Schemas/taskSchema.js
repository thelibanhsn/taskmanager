const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)
