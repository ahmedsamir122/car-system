const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/logout", authController.logout);
router.get("/me", authController.protect, authController.getMe);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/resetPasswordByPhone", authController.resetPasswordByPhone);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);
// router.patch(
//   "/updateMe",
//   authController.protect,
//   userController.uploadUserPhoto,
//   userController.updateMe
// );
// router.delete("/deleteMe", authController.protect, userController.deleteMe);
module.exports = router;
