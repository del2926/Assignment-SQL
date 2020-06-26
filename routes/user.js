const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router
  .route("/users")
  .get(userController.userList)
  .post(userController.registerUser);

router.post("/login", userController.loginUser);

router
  .route("/users/:userId")
  .post(userController.blockUser)
  .delete(userController.deleteUser);

router
  .route("/profile")
  .get(userController.userProfile)
  .post(userController.updateProfile);

module.exports = router;
