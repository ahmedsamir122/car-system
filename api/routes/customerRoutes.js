const express = require("express");
const customerController = require("../controllers/customerController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(customerController.getAllCustomers)
  .post(customerController.createCustomer);
router
  .route("/:id")
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);
module.exports = router;
