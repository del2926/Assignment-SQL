const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

const userMiddleware = require("../middlewares/user");

router
  .route("/users")
  .get(userMiddleware.authenticateUser, userController.userList)
  .post(userController.registerUser);

router.post("/login", userController.loginUser);

router
  .route("/users/:userId")
  .get(userMiddleware.authenticateUser, userController.userDetail)
  .post(userMiddleware.authenticateUser, userController.blockUser)
  .delete(userMiddleware.authenticateUser, userController.deleteUser);

router
  .route("/my-profile")
  .get(userMiddleware.authenticateUser, userController.userProfile)
  .post(userMiddleware.authenticateUser, userController.updateProfile);

module.exports = router;
