const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://HungryHopperAdmin:hhafoods123@cluster0.xorg9y0.mongodb.net/hungryhopperdb?retryWrites=true&w=majority'
const mongoDB = async ()=>{
    await mongoose.connect(mongoURI, {useNewUrlParser : true} ,async (err,result)=>{
        if(err){console.log("----",err);}
        else{
            // console.log("connected successfully")
            const fetched_data = await mongoose.connection.db.collection('food_items')
            fetched_data.find({}).toArray(function(err,data){
                if(err){console.log(err);}
                else{
                    console.log(data);
                }
            });
        }
    })
}


module.exports = mongoDB;