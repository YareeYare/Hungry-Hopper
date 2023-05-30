const express =require('express')
const router = express.Router()
const Order = require('../models/MyOrders')

router.post('/myordersData', async (req, res) => {
    let data = req.body.MyOrdersData
    await data.splice(0,0, {Order_date : req.body.orderDate})

    let emailId = await Order.findOne({ 'email': req.body.email })    
    if (emailId===null) {
        try {
            await Order.create({
                email: req.body.email,
                MOData:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email : req.body.email},
                { $push:{MOData: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

module.exports = router;