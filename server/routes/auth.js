const express =require('express');//used to make rest api.
const User =require("../models/user");
const jwt =require('jsonwebtoken');// for if when user have an account then home screen should be open. not login screen.We use this to get user data after login and it is create at the time of login and get back to client

const authRouter =express.Router();//to initilize the express
const auth=require("../middlewares/auth");
// to test api we use thunder client or postman
authRouter.post('/api/signup',async (req,res) =>{
    try{
        const {name,email,profilePic}=req.body;// come from client.
        /*
           http.post('localhost:3000/api/signup',body:{
           'name' :name,
           'email' :email,
           'profilepic' :profilepic,
           }
        */

        //check if same email exists or not if yes then dont store the data else store the data.
        let user = await User.findOne({email: email}); //gives list of all user having the same email id

        if(!user){
            user = new User({
                email:email,
                profilePic:profilePic,
                name: name,
            });//created the new user but not saved in mongodb.
            user=await user.save();// to save user in mongodb.
        }
        
        const token=jwt.sign({id: user._id},"passwordKey"/*this is the key*/);
        
        //to get the data from mongo
        res.json({user : user,token});// to send this data to client in json format
    }catch(e){
        res.status(500).json({error: e.message});
    }
});//this is route of our api to post the data.


authRouter.get('/',auth/* it is a midle were*/,async (req,res) =>{
    // now we can use mongoose to get our data
    const user =await User.findById(req.user);//mongoose will give the user info
    res.json({user ,token: req.token});// response
})// to get user data

module.exports = authRouter;