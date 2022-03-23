require("dotenv").config();
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const {  ROLE,users } = require('./data')
const {authUser, authRole} = require('./controllers/aut')
const authenticationrouter = require('./routes/authenticationrouter')
const speakerRouter = require('./routes/speakerRouter')
const studentController = require('./routes/studentRouter')
const eventController = require('./routes/eventRouter')
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const multer = require('multer')
const path = require("path")
 
 const  storage = multer.diskStorage({
    destination:(req, file, cb)=> {
    cb(null,path.join(__dirname,"images"))
    },
    filename:(req,file,cb)=>{
      cb(null, new Date().toLocaleDateString().replace(/\//g,"-")+"-"+file.originalname)
    }
 })
 
 const fileFilter = (req, file, cb)=>{
 
 if(file.mimetype == "image/jpeg"||
    file.mimetype == "image/jpg"||
    file.mimetype == "image/png")
 
    cb(null,true)
    else 
    cb(null,false)
 
 }

app.use(express.json())
// app.use =express();

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
  console.log("DB connectd......")
})
.catch(error=>{
    console.log("DB Problem")
})
app.use((request,response,next)=>{

  response.header("Access-Control-Allow-Origin","*");
  response.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
  response.header("Access-Control-Allow-Headers","Content-Type,Authorization")
  next();

})

app.use("/images", express.static(path.join(__dirname,"images")))

app.use(multer({storage, fileFilter}).single("image"))

app.use(setUser)
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(morgan(':url :method'))
app.use(cors())
app.use('/', authenticationrouter)
app.use('/', speakerRouter)
app.use('/', studentController)
app.use('/', eventController)
app.use((request, response, next) => {
  console.log(request.method, request.url)
  next()
})


app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/dashboard', authUser, (req, res) => {
  res.send('Dashboard Page')
})

app.get('/admin',authUser,authRole(ROLE.ADMIN), (req, res) => {
  res.send('Admin Page')
})


function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = users.find(user => user.id === userId)
  }
  next()
}

app.use((request, response, next) => {

  if (true) {
      console.log('authorized')

      next()
  }else {
      console.log('Not authorized')
  }

})


app.listen(process.env.PORT,() => {
  console.log(process.env.NODE_MODE)
  console.log("I am 3000 listening ..... ")
})

app.use((request,response)=>{
  response.status(404).json({data:"Not Fond"});
})

app.use((error,request,response,next)=>{   //JS  code function.length
  let status=error.status||500;
  response.status(status).json({Error:error+""});
})