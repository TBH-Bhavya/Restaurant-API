const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
     userName:{
        type:String,
        required:[true,'user name is required'],
     },
     email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
     },
     password:{
        type:String,
        required:[true,'password is required']
     },
     address:{
        type:Array
     },
     phone:{
        type:String,
        required:[true,'phone number is required']
     },
     usertype:{
        type:String,
        required:[true,'user type is required'],
        default:"client",
        enum : ["client","admin","vendor","driver"]
     },
     profile:{
        type:String,
        default:
            "https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?w=184&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7"
     },
     answer:{
      type:String,
      required:[true,"Please provide answer"],
     }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)