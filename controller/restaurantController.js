// Create Restaurant

const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async(req,res)=>{
    try {
        const {title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        } = req.body;

        // Validations
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:"Above fields are required"
            })
        }

        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        });
        await newRestaurant.save();
        res.status(201).send({
            success:true,
            message:"New Restaurant created successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Create Restaurant API",
            error
        })
    }
}

// Get all
const getAllRestaurantController = async(req,res)=>{
    try {
        const getRes = await restaurantModel.find({});
        if(!getRes){
            return res.status(404).send({
                success:false,
                message:"No restaurant found"
            })
        }
        res.status(201).send({
            success:true,
            totalCount:getRes.length,
            getRes
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Get Restaurant API",
            error
        })
    }
}

const getResByIdController = async(req,res)=>{
    try {
        const resId = req.params.id;
        if(!resId){
            return res.status(404).send({
                success:false,
                message:"No restaurantId found"
            })
        }
        const rest = await restaurantModel.findById(resId);
        if(!rest){
            return res.status(404).send({
                success:false,
                message:"No restaurant found"
            })
        }
        res.status(201).send({
            success:true,
            rest
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Get Restaurant API",
            error
        })
    }
}

// Delete Restaurant
const deleteResController = async(req,res)=>{
try {
    const resId = req.params.id;
    if(!resId){
        return res.status(404).send({
            success:false,
            message:"No restaurantId found"
        })
    }
    const rest = await restaurantModel.findByIdAndDelete(resId);
    res.status(201).send({
        success:true,
        message:"Restaurant Deleted successfully",
        rest
    })

} catch (error) {
    console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Delete Restaurant API",
            error
        })
}
}
module.exports = {createRestaurantController, getAllRestaurantController,getResByIdController,deleteResController}