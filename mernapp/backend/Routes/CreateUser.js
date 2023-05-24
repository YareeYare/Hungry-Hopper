const express =require('express')
const router = express.Router()
const User = require('../models/user')
const { body , validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

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

    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password,salt);

    try {
        await User.create({
            name : req.body.name,
            password : secpassword,
            email : req.body.email,
            location : req.body.location
        }).then(resp.json({success:true}))

    } catch (error) {
        console.log(error)
        resp.json({success:false})
    }
})

const jwtSecret = "konojorunojobananiwayumegaaru(#_#)"

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

        const pwdcompare = await bcrypt.compare(req.body.password,userdata.password);
        if(!pwdcompare){
            return resp.status(400).json({ errors: "Try with correct credentials" })
        }

        const data = {
            user:{
                id : userdata.id
            } 
        }
        const authToken = jwt.sign(data,jwtSecret)
        return resp.json({ success:true, authToken:authToken})

    } 
    catch (error) {
        console.log(error)
        resp.json({success:false})
    }
})

module.exports = router; 