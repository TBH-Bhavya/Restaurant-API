const express = require("express");
const { createCategoryController, getAllCatContoller, updateCatController,deleteCatController } = require("../controller/categoryController");


const router = express.Router();

// Routes
router.route('/createCat').post(createCategoryController)

router.route('/getAll').get(getAllCatContoller)

router.route('/update/:id').put(updateCatController)

router.route('/delete/:id').delete(deleteCatController)

module.exports = router