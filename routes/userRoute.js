const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController } = require('../controller/userController');


const router = express.Router();

router.route("/getUser").get(getUserController)
router.route("/updateUser").put(updateUserController)
router.route("/updatePassword").put(updatePasswordController)
router.route("/resetPassword").put(resetPasswordController)
router.route("/deleteUser/:id").delete(deleteProfileController)

module.exports = router;