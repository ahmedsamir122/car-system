const express = require("express");
const saleController = require("../controllers/saleController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router
  .route("/")
  .get(saleController.getAllSales)
  .post(saleController.createSale);
router
  .route("/:id")
  .patch(saleController.updateSale)
  .delete(saleController.deleteSale);
module.exports = router;
