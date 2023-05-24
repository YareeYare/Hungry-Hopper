const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://HungryHopperAdmin:hhafoods123@cluster0.xorg9y0.mongodb.net/hungryhopperdb?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
const mongoDB = async()=>{
    await mongoose.connect(mongoURI, {useNewUrlParser : true} ,async (err,result)=>{
        if(err){console.log("----",err);}
        else{
            console.log("connected successfully")
            const fetched_data = await mongoose.connection.db.collection('food_items')
            fetched_data.find({}).toArray(async function(err,data){
                const foodcategory = await mongoose.connection.db.collection('food_category') 
                foodcategory.find({}).toArray(function(err,catData){
                    if(err){console.log(err);}
                    else{
                        global.food_items = data;
                        global.food_category = catData;
                    }
                })
                // if(err){console.log(err);}
                // else{
                //     global.food_items = data;
                //     console.log(global.food_items)
                // }
            });
        }
    })
}


module.exports = mongoDB;