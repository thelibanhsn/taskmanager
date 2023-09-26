const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const app = express()
const routes = require('./Routes/routes')
const port = 3001

app.use(cors())
app.use(express.json())
app.use("/api/taskmanager", routes)

mongoose
    .connect("mongodb://127.0.0.1:27017/taskmanagerdb")
    .then(console.log('DB connected'))
    .catch(e => console.log(e))

mongoose.set('strictQuery', false);



app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})