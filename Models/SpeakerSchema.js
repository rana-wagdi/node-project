const mongoose=require("mongoose");
 

const schema = new mongoose.Schema({
    name:String,
    email:{type:String, unique:true},

    password:{type:String, required:true},
  
    image:String,
    role: {type: String , enum: ["speakers", "admin"]},
    address:{
        city:String,
        street:Number,
        building:Number
        },
 
},
    

);
schema.plugin(require("mongoose-bcrypt"));



module.exports = mongoose.model("speakers",schema)