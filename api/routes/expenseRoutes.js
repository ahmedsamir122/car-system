const express = require("express");
const expenseController = require("../controllers/expensesController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router
  .route("/")
  .get(expenseController.getAllExpenses)
  .post(expenseController.createExpense);
router
  .route("/:id")
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);
module.exports = router;
