const express = require("express");
const { createRestaurantController, getAllRestaurantController, getResByIdController, deleteResController } = require("../controller/restaurantController");

const router = express.Router();

// Routes
router.route('/create').post(createRestaurantController)
router.route('/getAll').get(getAllRestaurantController)
router.route('/get/:id').get(getResByIdController)
router.route('/delete/:id').delete(deleteResController)

module.exports = router