const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config();

router.post('/user-info', async (req, res) => {
    const id = req.body.UserId
    try {
        if (id) {
            const userInfo = await user.findById(req.body.UserId).then((userInfo) => {
                res.json({
                    name: userInfo.name,
                    username: userInfo.username,
                    email: userInfo.email,
                })
            })
        } else if(!id) {
            res.json({ errMessage: 'Failed to send user information.' }).status(400)
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = router