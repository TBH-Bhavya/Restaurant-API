const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
// POST || Create Food
const createFoodController = async(req,res)=>{
 try {
    const {title,
        description,
        price,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
        ratingCount} = req.body;
        if(!title || !description ||!price || !restaurant){
            return res.status(500).send({
                success:false,
                message:"Provide necessary field"
            })
        }
        const food = await foodModel.create({title,
            description,
            price,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount})
            if(!food){
                return res.status(500).send({
                    success:false,
                    message:"No food is added"
                })
            }
            res.status(201).send({
             success:true,
             message:"Suceesfully Created",
             food
            })
 } catch (error) {
    console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Create Food API",
            error
        })
 }
}

// Get all 
const getAllFoodController = async(req,res)=>{
    try {
        const getFood = await foodModel.find({});
    if(!getFood){
        return res.status(404).send({
            success:true,
            message:"No Food Found"
        })
    }
    res.status(201).send({
        success:true,
        message:"Successfully Fetched",
        getFood
    }) 
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Fetch Food API",
            error
        })
    }
}

// GEt by ID
const getSingleFoodController = async(req,res)=>{
    try {
        const foodId = req.params.id;
        
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"Please provide id"
            })
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"No food is found with this id"
            })
        }
        res.status(201).send({
            success:true,
            food
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Fetch food API",
            error
        })
    }
}

// Get Food by restaurant
const getFoodByRestaurantController = async(req,res)=>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:"Please provide id"
            })
        }
        const food = await foodModel.find({restaurant:restaurantId});
        console.log(food);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"No food is found with this id"
            })
        }
        res.status(200).send({
            success:true,
            message:"Food base on restaurant",
            food
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Fetch food API",
            error
        })
    }
}

// Update by id
const updateByIdFoodController = async(req,res)=>{
       try {
        // const {id} = req.params;
        const foodId = req.params.id;
        const {title,description,price} = req.body
        if(!id){
            return res.status(404).send({
                success:false,
                message:"No Id found"
            })
        }
        const updateFood = await foodModel.findByIdAndUpdate(foodId, {title,description,price},{new:true});

        res.status(201).send({
            success:true,
            message:"Update Successfully",
            updateFood
        })
       } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in update food API",
            error
        })
       }
}

// Delete by id
const deleteByIdFoodController = async(req,res)=>{
         try {
            const foodId = req.params.id;
            if(!foodId){
                return  res.status(404).send({
                    success:false,
                    message:"No food found"
                })
            }
            const deleteFood = await foodModel.findByIdAndDelete(foodId);
            if(!deleteFood){
                return res.status(404).send({
                    success:false,
                    messsage:"No food found with this id"
                })
            }
            res.status(201).send({
                success:true,
                message:"Deleted successfully"
            })
         } catch (error) {
            console.log(error);
            return res.status(500).send({
                success:false,
                message:"Error in delete food API",
                error
            })
         }
}

// Place Order
const PlaceOrderController = async(req,res)=>{
    try {
        const {cart} = req.body;
        if(!cart){
            return res.status(500).send({
                success:false,
                message:"Please add food to cart ."
            })
        }
        let total = 0;
        // cal
         cart.map((i)=>{
            total += i.price
         })

         const newOrder = await orderModel({
            foods:cart,
            payment:total,
            buyer:req.body.id
         })
         await newOrder.save()
        res.status(201).send({
            success:true,
            message:"Order Placed Successfully",
            newOrder
        })
    } catch (error) {
        console.log(error);
            return res.status(500).send({
                success:false,
                message:"Error in place order API",
                error
            })
    }
}

// Change order status
const orderStatusController = async(req,res)=>{
 try {
    const orderId = req.params.id;
    const {status} = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
    res.status(200).send({
        success:true,
        message:"Order status updated"
    })
 } catch (error) {
    console.log(error);
            return res.status(500).send({
                success:false,
                message:"Error in Order status API",
                error
            })
 }
}

module.exports = {createFoodController,
    getAllFoodController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateByIdFoodController,
    deleteByIdFoodController,
    PlaceOrderController,
    orderStatusController
}