const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Car = require("../models/carModel");
const Sale = require("../models/saleModel");
const Purchase = require("../models/purchaseModel");
const Expense = require("../models/expenseModel");

exports.getAllCars = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Car.find(), req.query).filter();

  // 2️⃣ Clone query BEFORE pagination
  const filteredQuery = features.query.clone();

  // 3️⃣ Get filtered count
  const filteredCount = await filteredQuery.countDocuments();

  // 4️⃣ Apply باقي العمليات
  features.sort().limitFields().paginate();

  const cars = await features.query;

  res.status(200).json({
    status: "success",
    totalNum: filteredCount,
    data: {
      data: cars,
    },
  });
});
exports.createCar = catchAsync(async (req, res, next) => {
  const newCar = await Car.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      car: newCar,
    },
  });
});
exports.updateCar = catchAsync(async (req, res, next) => {
  const newCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      car: newCar,
    },
  });
});
exports.deleteCar = catchAsync(async (req, res, next) => {
  await Car.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getStats = catchAsync(async (req, res, next) => {
  const year = +req.params.year; // convert to number

  const soldPerMonth = await Sale.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${year + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },

        totalSold: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  const availableCars = await Car.countDocuments({
    status: "available",
  });

  res.json({
    soldPerMonth,
    availableCars,
  });
});
exports.getPaymentPercent = catchAsync(async (req, res, next) => {
  const stats = await Sale.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().getFullYear(), 0, 1),
          $lt: new Date(new Date().getFullYear() + 1, 0, 1),
        },
      },
    },
    {
      $group: {
        _id: "$paymentType",
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$count" },
        data: {
          $push: {
            type: "$_id",
            count: "$count",
          },
        },
      },
    },
    {
      $unwind: "$data",
    },
    {
      $project: {
        _id: 0,
        type: "$data.type",
        count: "$data.count",
        percentage: {
          $multiply: [{ $divide: ["$data.count", "$total"] }, 100],
        },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: stats,
  });
});
exports.getMonthlyProfit = catchAsync(async (req, res, next) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const incomeResult = await Sale.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfMonth,
          $lt: startOfNextMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$price" }, // or your sale field
      },
    },
  ]);

  const purchaseResult = await Purchase.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfMonth,
          $lt: startOfNextMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalPurchases: { $sum: "$price" },
      },
    },
  ]);

  const billsResult = await Expense.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfMonth,
          $lt: startOfNextMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalBills: { $sum: "$amount" },
      },
    },
  ]);

  const income = incomeResult[0]?.totalIncome || 0;
  const purchases = purchaseResult[0]?.totalPurchases || 0;
  const bills = billsResult[0]?.totalBills || 0;

  const totalExpenses = purchases + bills;
  const profit = income - totalExpenses;

  res.json({
    income,
    expenses: totalExpenses,
    profit,
  });
});
