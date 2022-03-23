const mongoose=require("mongoose");


//build schema

const schema = new mongoose.Schema({

    _id:Number,
    date:Date,
    title:String,

  main_speaker:{type:mongoose.Types.ObjectId, ref:"speakers"},
  speakers:[{type:mongoose.Types.ObjectId, ref:"speakers"}],
  students:[{type:Number, ref:"students"}],
 
},
    
    
);


module.exports = mongoose.model("events",schema)