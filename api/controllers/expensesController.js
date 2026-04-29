const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Expense = require("../models/expenseModel");

exports.getAllExpenses = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Expense.find(), req.query).filter();

  // 2️⃣ Clone query BEFORE pagination
  const filteredQuery = features.query.clone();

  // 3️⃣ Get filtered count
  const filteredCount = await filteredQuery.countDocuments();

  // 4️⃣ Apply باقي العمليات
  features.sort().limitFields().paginate();

  const expenses = await features.query;

  res.status(200).json({
    status: "success",
    totalNum: filteredCount,
    data: {
      data: expenses,
    },
  });
});
exports.createExpense = catchAsync(async (req, res, next) => {
  const newExpense = await Expense.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      expense: newExpense,
    },
  });
});
exports.updateExpense = catchAsync(async (req, res, next) => {
  const newExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      expense: newExpense,
    },
  });
});
exports.deleteExpense = catchAsync(async (req, res, next) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
