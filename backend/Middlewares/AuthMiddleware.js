const mongoose = require('mongoose')
const User = require('../Schemas/userSchema')
const jwt = require('jsonwebtoken')

// Middleware for protected routes
const protectedRoutes = async (req, res, next) => {

    try {

        // check if the header has Bearer token and Authrization
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // get the token
            const token = req.headers.authorization.split(' ')[1]

            // verify token
            const verifiedToken = jwt.verify(token, process.env.SECRETKEY)

            // if not verified, return not authrized
            if (!verifiedToken) {
                throw new Error()
            }

            // otherwise get the user and add it in the requests
            req.user = await User.findById(verifiedToken.id).select('-password')

            next()
        } else {

            res.status(401).json({ msg: "Not Authorized" })
        }

    }

    // catch errors
    catch (err) {
        res.send(err)
    }

}


module.exports = { protectedRoutes }
