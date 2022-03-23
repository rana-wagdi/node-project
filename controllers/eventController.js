
const { validationResult } = require("express-validator");

const eventusers = require('../Models/EventsSchema');

const getAllEvents = (request, response, next) => {

    
    eventusers.find({}).populate({path:"students"}).populate({path:"speakers"})
        .then(data =>{
            response.status(200).json(data)
        })

        .catch(error=>{
           next(error)
        })
  
}

const createEvent = (request, response, next) => {
    if(request.role =="admin"){
    
        let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
    
            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
    
            throw error;
    
        }
    
        let object = new eventusers ({
    
            _id:request.body.id,
            date:request.body.date,
            title:request.body.title,
            main_speaker:request.body.main_speaker,
            speakers:request.body.speakers,
            students:request.body.students
            
    })
    
    object.save()
          .then(data=>{
            response.status(201).json({ data: "added", BODY: request.body })
            next()    
          
          })
    
    }else{
        throw new Error("Not Allowed")
    }
  
  
}



const updateEvent = (request, response) => {
    if(request.body.role=="admin"){ 
    events.findByIdAndUpdate(request.body.id,{     //admin only can update
        $set:{
            title:request.body.title,
            date:request.body.date,
            main_speaker:request.body.main_speaker,
            speakers:request.body.speakers,
            students:request.body.students,
        }})
        .then(data=>{
            response.status(200).json({massage:"update",data})
          })
          .catch(error=>next(error)) 

}else{

    throw new Error("Not allowed")
 }
}
const deleteEvent = (request, response) => {

    if(request.body.role=="admin"){
      
        events.findByIdAndDelete(request.body.id)
        .then(data=>{
              if(data==null) throw new Error("not Found!")
              response.status(200).json({message:"deleted"})
           
        })
        .catch(error=>next(error))
     }else{
  
        throw new Error("Not Allowed")
     }
  

}


module.exports = {

    getAllEvents,
    updateEvent,
    createEvent,
    deleteEvent,
}