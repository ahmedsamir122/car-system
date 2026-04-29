const express = require("express");
const carController = require("../controllers/carController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(carController.getAllCars).post(carController.createCar);
router
  .route("/payment-percentage")
  .get(authController.restrictTo("admin"), carController.getPaymentPercent);
router
  .route("/car-sold-stats/:year")
  .get(authController.restrictTo("admin"), carController.getStats);
router
  .route("/monthlyProfit")
  .get(authController.restrictTo("admin"), carController.getMonthlyProfit);
router
  .route("/:id")
  .patch(carController.updateCar)
  .delete(carController.deleteCar);
module.exports = router;
