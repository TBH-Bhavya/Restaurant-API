const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerController = async(req,res)=>{
try {
    const {userName,email,password,address,phone,answer} = req.body
    //validations
    if(!userName || !email || !password || !address || !phone || !answer){
        return res.status(500).send({
            success:false,
            message:'All Fields are required'
        })
    }
        //check user
        const userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(500).send({
                success:false,
                message:'User already exist'
            })
        }

        // Hashed password
        var salt = bcrypt.genSaltSync(10);
        const hasedPassword = await bcrypt.hash(password,salt); 

        //create new user 
        const user = await userModel.create({userName,email,password:hasedPassword,address,phone,answer})
        // res.status(201).json(user);
        res.status(201).send({
            success:true,
            message:'Successfully Registered',
            user
        });
        console.log(user);
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in registered API',
        error
    })
}
}


// Login
const loginController = async (req,res)=>{
    try {
        const {email,password} = req.body
        // Validations
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"Please provide Email OR Password",
            })
        }

        // Check User
        const user = await userModel.findOne({email:email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found",
            })
        }

        // Chech User password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            })
        }

        // Token
         const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
         })

        res.status(201).send({
            success:true,
            message:"Login Successfully",
            token,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login API",
            error
        })
    }
}

module.exports = {registerController,loginController}