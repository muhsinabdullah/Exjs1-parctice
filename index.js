const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require("helmet");
require('dotenv').config();
const mongoose = require('mongoose');
const User1 = require('./models/User1');



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());

app.get('/', function (req, res) {
  res.send('Hello World');
});
//mongodb
const uri = process.env.uri;

mongoose.connect(uri,{
  useNewUrlparser:true,
  useUnifiedTopology:true,
});

mongoose.connection.on("connected",()=>{
  console.log("connected to database");
});

//routers
//post request
app.post("/user", async(req,res)=>{
  const newUser1 = new User1({
    Name:req.body.Name,
    Phone:req.body.Phone,
    Email:req.body.Email,
    Address:req.body.Address,
    Password:req.body.Password,
  });

const responseFromDB = await newUser1.save();
res.status(200).json({
  message:'Todo created successfully',
  success:'true',
  responseFromDB,
});
});
//get request
app.get("/user", async(req,res)=>{
  console.log("Get request recived");
  const Users1= await User1.find();

  res.status(200).json({
    message:"Todos fetched succesfully",
    success: "true",
    Users1,
  });
});
//Delete request
app.delete("/user/:id", async(req,res)=>{
  const id= req.params.id;
  const responseFromDB = await User1.findByIdAndDelete(id);

  res.status(200).json({
    message:'Todo deleted successfully',
    success:'true',
    responseFromDB,
  });
});
//Put request
app.put("/user/:id", async(req, res)=>{
  const id= req.params.id;
  const responseFromDB= await User1.findByIdAndUpdate(id, 
    {
      Name:req.body.Name,
      Phone:req.body.Phone,
      Email:req.body.Email,
      Address:req.body.Address,
      Password:req.body.Password,
    },
    {
      new:true,
    }
  );
  
  res.status(200).json({
    message:'Todo updated successfully',
    success:'true',
    responseFromDB,
  });

});

const port = process.env.port||4500;
app.listen(port,()=>{
    console.log(`Server is running on port: http://localhost:${port}`)
});