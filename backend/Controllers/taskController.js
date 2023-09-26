const mongoose = require('mongoose')
const Task = require('../Schemas/taskSchema')

// create new task
const newTask = async (req, res) => {
    // get user data from req body
    const { task, deadline, isCompleted } = req.body
    const deadlineDay = new Date(deadline)
    deadlineDay.setHours(3, 0, 0, 0) // base on my local time GMT+3
    try {

        // check if date isn't late
        // if (ISODate(deadline) < new Date()) return res.status(404).json({ msg: 'Date has been passed' })

        //create data into db
        const taskData = await Task.create({
            task,
            deadline: deadlineDay,
            isCompleted,
            user: req.user.id
        })

        if (taskData) {
            res.status(201).json({
                msg: 'successfully created a new task',
                taskData
            })
        }
    }
    catch (err) {
        //catch error
        res.status(404).send(err)
    }
}

// Get all tasks
const getTasks = async (req, res) => {
    // get the user from req
    const { id } = req.user

    try {

        //find the all tasks related to the user from db
        const tasks = await Task.find({ user: id })

        //check if there aren't tasks
        if (!tasks) res.status(404).json({ msg: 'No tasks here..' })

        //return it as json
        res.status(200).json({ tasks })
    }

    //catch errors
    catch (err) {
        res.status(404).json({ msg: 'failed to get all tasks' })
        res.send(err)
    }
}


// Update Task
const updateTask = async (req, res) => {
    // get id from params
    const { id } = req.params

    //get data from the body
    const { task, deadline, isCompleted } = req.body


    try {
        // check if id exits in the db
        if (await Task.findById(id)) {
            //find by that id and update with new data
            const updatedTask = await Task.findByIdAndUpdate({ _id: id }, { task, deadline, isCompleted })

            if (!updatedTask) res.status(404).send({ msg: 'check the fiels' })

            res.status(200).json({
                msg: 'Updated successfully',
                updateTask
            })
        }

    } catch (err) {
        res.status(404).send({ msg: 'Update failed ..' })
    }

}

// Delete Task
const deleteTask = async (req, res) => {
    //get the id in req params
    const { id } = req.params

    try {
        // check if the id exists in the db, 
        //and if so delete it
        if (await Task.findById(id)) {
            await Task.findByIdAndDelete({ _id: id })
            res.status(200).send({ msg: "Deleted Task from the db" })
        } else {
            res.status(404).send({ msg: "No task with this ID in the DB" })
        }

    } catch {
        res.status(404).send({ msg: "Failed to delete a Task" })
    }
}

//Completed Tasks
const completedTasks = async (req, res) => {
    try {
        //get completed tasks from db
        const completeTasks = await Task.find({ user: req.user.id, isCompleted: true, })
        if (!completeTasks) res.send({ msg: 'No completed Tasks' })
        res.status(200).json({
            msg: 'here is your completed tasks',
            completeTasks
        })

    } catch (err) {
        res.status(404).send({ msg: 'Failed to get completed tasks' })
    }
}

//Pending Tasks
const pendingTasks = async (req, res) => {
    try {
        //query pending tasks from db
        const pendingTasks = await Task.find({ user: req.user.id, isCompleted: false, })
        if (!pendingTasks) res.send({ msg: 'No pending Tasks' })
        res.status(200).json({
            msg: 'here is your pending tasks',
            pendingTasks
        })

    } catch (err) {
        res.status(404).send({ msg: 'Failed to get pending tasks' })
    }
}

//Today's Tasks 
const todayTasks = async (req, res) => {
    const today = new Date()
    today.setHours(3, 0, 0, 0); // Sets to the end of the day

    try {
        console.log(new Date())
        //query tasks from the user and btw startdate and enddate
        const tasks = await Task.find({ user: req.user.id, deadline: { $gte: today, $lt: new Date() } })

        //if there aren't return no tasks 
        if (!tasks) res.status(404).send({ msg: 'failed to get today tasks ' })

        // return tasks
        res.json(tasks)
    } catch (err) {
        res.status(404).send({ msg: `Error : ${err}` })
    }
}

//Overdue Tasks
const overdueTasks = async (req, res) => {
    const today = new Date()
    today.setHours(3, 0, 0, 0); // Sets to the end of the day

    try {
        //query tasks from the user and btw startdate and enddate
        const tasks = await Task.find({ user: req.user.id, deadline: { $lt: today } })

        //if there aren't return no tasks 
        if (!tasks) res.status(404).send({ msg: 'failed to get overdue tasks ' })

        // return tasks
        res.json(tasks)
    } catch (err) {
        res.status(404).send({ msg: `Error : ${err}` })
    }
}

module.exports = { newTask, getTasks, updateTask, deleteTask, completedTasks, pendingTasks, todayTasks, overdueTasks }