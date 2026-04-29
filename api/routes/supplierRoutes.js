const express = require("express");
const supplierController = require("../controllers/supplierController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router
  .route("/")
  .get(supplierController.getAllSuppliers)
  .post(supplierController.createSupplier);
router
  .route("/:id")
  .patch(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier);
module.exports = router;
