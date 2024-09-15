const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect(process.env.MONGO_URL,{

}).then(()=>{
    console.log("Connection is established");
}).catch((e)=>{
    console.log("Something is wrong when we try to connect");
})
