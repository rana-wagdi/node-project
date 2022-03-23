const mongoose=require("mongoose");
var bcrypt   = require('bcrypt-nodejs'); 


const schema = new mongoose.Schema({

    _id:Number,
    fullName:String,
    email:{type:String, unique:true},
    password:{type:String, required:true},
    role:String
}
    
);

schema.plugin(require("mongoose-bcrypt"));

module.exports = mongoose.model("students",schema)