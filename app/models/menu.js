const  mongoose  = require("mongoose");

const schema = mongoose.Schema

const menuSchema = new schema({
    name : { type:String, required:true,},
    image : { type:String, required:true,},
    price : { type:Number, required:true,},
    size : { type:String, required:true,}
})

module.exports = mongoose.model('menu', menuSchema)