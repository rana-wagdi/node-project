const jwt= require("jsonwebtoken");
require("dotenv").config();

module.exports=(request,response,next)=>{
    let token, decode;
    try{
     token =request.get("Authorization").split(" ")[1]; 
     
    decode = jwt.verify(token,process.env.SECRET_KEY)
    }catch(error)
    {
    
        error.message="No Aaaaaauthorized"
        error.status=403;
        next(error)
    }
    if(decode !== undefined){
        request.email=decode.email;
        request.role=decode.role; 

        next()
    
    }
   
    }
    