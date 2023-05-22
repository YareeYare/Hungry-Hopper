const express =require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/createuser', async (req,resp)=>{
    try {
        await User.create({
            name : req.body.name,
            password : req.body.password,
            email : req.body.email,
            location : req.body.location
        })
    resp.json({success:true})

    } catch (error) {
        console.log(error)
        resp.json({success:false})
    }
})

module.exports = router; 