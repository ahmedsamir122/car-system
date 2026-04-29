const express = require("express");
const installmentController = require("../controllers/installmentController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router
  .route("/")
  .get(installmentController.getAllInstallments)
  .post(installmentController.createInstallment);
router
  .route("/:id")
  .patch(installmentController.updateInstallment)
  .delete(installmentController.deleteInstallment);
module.exports = router;
