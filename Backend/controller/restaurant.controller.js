const Restaurant = require('../database/Schema/restaurant.schema');

module.exports.restaurantsList = async function(resq,res){
    try{
        const list = await Restaurant.find();

        //console.log(list);

        res.status(200).json({
            list
        })
    }catch(err){    console.log(err); }
}