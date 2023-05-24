const express =require('express')
const router = express.Router()
const User = require('../models/user')
const { body , validationResult } = require('express-validator')

router.post('/createuser', 
[  
    body('email','Invalid e-mail ID').isEmail(),
    body('name','Name is too short, should be at least of 5 characters').isLength({ min : 5}),
    body('password','Incorrect Password').isLength({ min : 4})
]
,async (req,resp)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    try {
        await User.create({
            name : req.body.name,
            password : req.body.password,
            email : req.body.email,
            location : req.body.location
        }).then(resp.json({success:true}))

    } catch (error) {
        console.log(error)
        resp.json({success:false})
    }
})

router.post('/loginuser', 
[  
    body('email','Invalid e-mail ID').isEmail(),
    body('password','Incorrect Password').isLength({ min : 4})
]
,async (req,resp)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    
    let email = req.body.email

    try {
        let userdata = await User.findOne({email});
        if(!userdata){return resp.status(400).json({ errors: "Try with correct credentials" })}

        if(req.body.password !== userdata.password){
            return resp.status(400).json({ errors: "Try with correct credentials" })
        }
        return resp.json({ success:true })

    } 
    catch (error) {
        console.log(error)
        resp.json({success:false})
    }
})

module.exports = router; 