
// nodemon is used so that if make any change in the file after saving the change the server will restart automatically
const express =require('express');// to import express and stored in express variable.Used to  make rest api quicker
const mongoose = require("mongoose");//to import mongoose
const cors=require('cors');
const http=require('http');
const authRouter = require('./routes/auth');
const documentRouter = require('./routes/document');

const PORT =process.env.PORT/* for web*/ | 3001/*for local development*/;// assigining a port for the server,3000 is used for web application.
const DB ="mongodb+srv://prateek:7728335@cluster0.gvxfiue.mongodb.net/?retryWrites=true&w=majority"; // mongo db url.
const app =express();// to initilize the express and stored in app variable ,const is used so that we cannot reassign the variable
var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(cors());
app.use(express.json());//to convert client side data into json format so that it can be stored in database in right format.
//data comes from client side to sever side we need middle were
app.use(authRouter);// middle wwere
app.use(documentRouter);// to make the document

mongoose.connect(DB).then(() =>{
        console.log('Connection successful');
    }).catch((err) =>{
        console.log(err);
    });// to connect with the database.

    io.on("connection", (socket) => {
      socket.on("join", (documentId) => {
        socket.join(documentId);
        console.log("joined");
      });

      socket.on("typing", (data) => {
        socket.broadcast.to(data.room).emit("changes", data);
      });

      socket.on("save", (data) => {
        saveData(data);
      });
    });

    const saveData = async (data) => {
      let document = await Document.findById(data.room);
      document.content = data.delta;
      document = await document.save();
    };



server.listen(PORT,"0.0.0.0"/*you can access this from any ip address*/,/*call back function*/
()=>{
console.log(`connected at port ${PORT}`);

});//used to start the server. continue to listen the server and respond to it.form which port should it start running


