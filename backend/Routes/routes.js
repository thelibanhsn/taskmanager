const express = require('express')
const router = express.Router()

const { register, login } = require('../Controllers/userController')
const { newTask, getTasks, updateTask, deleteTask, completedTasks, pendingTasks, todayTasks, overdueTasks } = require('../Controllers/taskController')
const { protectedRoutes } = require('../Middlewares/AuthMiddleware')

//User reigster route
router.post('/register', register)

//User login route
router.post('/login', login)

//New task route
router.post('/newtask', protectedRoutes, newTask)

//Get Tasks route
router.get('/', protectedRoutes, getTasks)

//Update Task route
router.patch('/:id', protectedRoutes, updateTask)

//Delete Task route
router.delete('/:id', protectedRoutes, deleteTask)

//completed Tasks route
router.get('/completedtasks', protectedRoutes, completedTasks)

//pending Tasks route
router.get('/pendingtasks', protectedRoutes, pendingTasks)

//Tasks due today route
router.get('/todaytasks', protectedRoutes, todayTasks)

//overdue tasks route
router.get('/overduetasks', protectedRoutes, overdueTasks)

module.exports = router
