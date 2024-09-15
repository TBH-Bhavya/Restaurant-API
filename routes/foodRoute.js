const express = require("express");
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController, updateByIdFoodController,deleteByIdFoodController, PlaceOrderController, orderStatusController } = require("../controller/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");



const router = express.Router();

// Routes
router.route('/create').post(createFoodController);
router.route('/getAll').get(getAllFoodController);
router.route('/get/:id').get(getSingleFoodController)
router.route('/getByRestaurant/:id').get(getFoodByRestaurantController)
router.route('/update/:id').put(updateByIdFoodController)
router.route('/delete/:id').delete(deleteByIdFoodController)

// Place order
router.route('/placeorder').post(PlaceOrderController)

// Order status
router.route('/orderStatus/:id').post(adminMiddleware,orderStatusController)

module.exports = router