const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Sale = require("../models/saleModel");
const Customer = require("../models/customerModel");
const Car = require("../models/carModel");

exports.getAllSales = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Sale.find(), req.query).filter();
  // 2️⃣ Clone query BEFORE pagination
  const filteredQuery = features.query.clone();

  // 3️⃣ Get filtered count
  const filteredCount = await filteredQuery.countDocuments();

  // 4️⃣ Apply باقي العمليات
  features.sort().limitFields().paginate();

  const sales = await features.query.populate("car").populate("customer");

  res.status(200).json({
    status: "success",
    totalNum: filteredCount,
    data: {
      data: sales,
    },
  });
});
exports.createSale = catchAsync(async (req, res, next) => {
  const customerName = await Customer.findById(req.body.customer);
  const soldCar = await Car.findByIdAndUpdate(
    req.body.car,
    { status: "sold" },
    {
      new: true,
      runValidators: true,
    }
  );
  req.body.name = customerName.name;
  const newSale = await Sale.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      sale: newSale,
    },
  });
});
exports.updateSale = catchAsync(async (req, res, next) => {
  const newSale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      sale: newSale,
    },
  });
});
exports.deleteSale = catchAsync(async (req, res, next) => {
  await Sale.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
