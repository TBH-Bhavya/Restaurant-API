const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
// Get User Info
const getUserController = async(req,res)=>{
    // res.status(200).send("User Data")
    // console.log(req);
    try {
        // find user
        const user = await userModel.findById({_id: req.body.id})
        // validations
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        // hide password
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:"User Get Successfully",
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while fetching the user."
        })
    }
}

const updateUserController = async(req,res)=>{
    const {userName,address,phone} = req.body
        const id = req.body.id;
  try {
       const updateUser = await userModel.findByIdAndUpdate(id,{userName,address,phone},{new:true})
       if(!updateUser){
        return res.status(404).send({
            success:false,
            message:"User Not Found"
        })
       }
       res.status(201).send({
        success:true,
        message:"User Updated Successfully",
        updateUser
       })


       //METHOD 2
    //     const user = await User.findById(userId);
    
    //     if (!user) {
    //       return res.status(404).json({ message: 'User not found'   
    //  });
    //     }
    
    //     if (phone) {
    //       user.phone = phone;
    //     }
    //     if (address) {
    //       user.address = address;
    //     }
    //     if (username) {
    //       user.username = username;
    //     }
    
    //     await user.save();
    
    //     res.status(200).json({ message: 'User updated successfully', user: user });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"Error in Update User API",
        error
    })
  }
}

const updatePasswordController = async(req,res)=>{
      try {
        // find user
        const user = await userModel.findById({_id:req.body.id})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found."
            })
        }
        // get data from user
        const {oldPassword,newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"Please provide old or new password."
            })
        }
        // Check User passwiord | compare password
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            })
        }

        // Hashing Password
        var salt = bcrypt.genSaltSync(10);
        const hasedPassword = await bcrypt.hash(newPassword,salt); 
        user.password = hasedPassword;
        await user.save();
        res.status(201).send({
            success:true,
            message:"Password Updated!"
        })


      } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Password Update API",
            error
        })
      }
}

const resetPasswordController = async(req,res)=>{
     try {
        const {email,newPassword,answer} = req.body
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"Please provide all fields"
            })
        }

        const user = await userModel.findOne({email,answer});
        if(!user){
            return res.status(500).send({
                success:false,
                message:"User not found or invalid answer"
            })
        }
// Hashing password
var salt = bcrypt.genSaltSync(10);
const hashedPassword = await bcrypt.hash(newPassword,salt)
user.password = hashedPassword;
await user.save();
res.status(201).send({
    sucess:true,
    message:"Password Reset Successfully"
})

     } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Password Update API",
            error
        })
      }
} 

// DELETE PROFILE ACCOUNT
const deleteProfileController = async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Your account has been deleted."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Delete Profile API",
            error
        })
    }
}

module.exports = {getUserController,updateUserController,updatePasswordController,resetPasswordController,deleteProfileController}