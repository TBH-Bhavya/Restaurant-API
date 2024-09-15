const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
      title:{
        type:String,
        required:[true,"Food title is required"]
      },
      description:{
        type:String,
        required:[true, "Food description is required"]
      },
      price:{
         type:Number,
         required:[true,"Please provide food price"]
      },
      foodTags:{
        type:String
      },
      category:{
        type:String
      },
      code:{
        type:String
      },
      isAvailable:{
        type:Boolean,
        default:true
      },
      restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
      },
      rating:{
        type:Number,
        default:5,
        min:1,
        max:5
      },
      ratingCount:{
        type:String
      }
},
{timestamps:true}
);

// exports
module.exports = mongoose.model("Foods",foodSchema)