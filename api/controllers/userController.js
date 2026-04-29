const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Customer = require("../models/customerModel");

exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Customer.find(), req.query).filter();

  // 2️⃣ Clone query BEFORE pagination
  const filteredQuery = features.query.clone();

  // 3️⃣ Get filtered count
  const filteredCount = await filteredQuery.countDocuments();

  // 4️⃣ Apply باقي العمليات
  features.sort().limitFields().paginate();

  const customers = await features.query;

  res.status(200).json({
    status: "success",
    totalNum: filteredCount,
    data: {
      data: customers,
    },
  });
});
exports.createCustomer = catchAsync(async (req, res, next) => {
  const newCustomer = await Customer.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      customer: newCustomer,
    },
  });
});
exports.updateCustomer = catchAsync(async (req, res, next) => {
  const newCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      customer: newCustomer,
    },
  });
});
exports.deleteCustomer = catchAsync(async (req, res, next) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
