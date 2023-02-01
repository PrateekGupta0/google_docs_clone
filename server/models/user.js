const mongoose =require('mongoose');

/*structure of user */
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
         type:String,
         required: true,
    },
    profilePic:{
         type:String,
         required: true,
    },
});

/* now how to and where to store the data what is the name of the collection etc */

const User = mongoose.model("User",userSchema);
module.exports =User;// now User is public variable.