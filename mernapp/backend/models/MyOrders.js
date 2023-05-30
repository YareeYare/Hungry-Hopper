const mongoose = require('mongoose')

const { Schema } = mongoose; //destructuring

const MyOrdersSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    MOData : {
        type: Array,
        required : true
    }
});

module.exports = mongoose.model('myorders',MyOrdersSchema)