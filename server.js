const express = require("express");
require("./config/db");
const testRoute = require('./routes/testRouter');
const dotenv = require("dotenv");
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const restaurantRoute = require('./routes/restaurantRoute');
const categoryRoute = require('./routes/categoryRoute');
const foodRoute = require('./routes/foodRoute');
const authMidleware = require("./middlewares/authMidleware");
// rest object
const app = express();
dotenv.config();

app.use(express.json())
app.use('/api/v1/test', testRoute)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/user',authMidleware,userRoute)
app.use('/api/v1/restaurant',authMidleware,restaurantRoute)
app.use('/api/v1/category',authMidleware,categoryRoute)
app.use('/api/v1/food',authMidleware,foodRoute)

const port = 4040 || process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})