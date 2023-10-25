const mongoose = require('mongoose')
const User = require('../Schemas/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


// User Registration

const register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        if (name == '' || email == '' || password == '') {
            res.status(404).json({ msg: 'fill empty fields' })
        }

        // check if email exits

        if (await User.findOne({ email })) {
            res.status(400).json({ msg: 'Email already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        if (user) {
            res.status(201).json({
                user,
                msg: "New account has been created"
            })
        }
    } catch (err) {
        res.json(err)
        res.send({ err })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {

        // 2- check if email exists
        const user = await User.findOne({ email })
        if (user) {


            // 3- if email exists, compare the 2 passwords
            const isMatchedPass = await bcrypt.compare(password, user.password)

            if (isMatchedPass) {
                // 4- if matches, create a jwt token and get user data
                const token = jwt.sign({ id: user._id }, process.env.SECRETKEY)

                // 5- return a success logged in message, user data and the token
                res.status(200).json({
                    msg: "logged in successfully",
                    user,
                    token,
                })
            }
            else {

                return res.status(401).send("incorrect incredentials 1")
            }

        }
        else {
            return res.status(401).send("incorrect incredentials")
        }
    }

    catch (err) {
        // 6- catch the errors
        res.status(404).json({ msg: err.message })
        res.send('Auth error')
    }

}

module.exports = { register, login }