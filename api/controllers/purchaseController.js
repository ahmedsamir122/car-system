const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Purchase = require("../models/purchaseModel");
const Supplier = require("../models/supplierModel");

exports.getAllPurchases = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Purchase.find(), req.query).filter();

  // 2️⃣ Clone query BEFORE pagination
  const filteredQuery = features.query.clone();

  // 3️⃣ Get filtered count
  const filteredCount = await filteredQuery.countDocuments();

  // 4️⃣ Apply باقي العمليات
  features.sort().limitFields().paginate();

  const purchases = await features.query.populate("car").populate("supplier");

  res.status(200).json({
    status: "success",
    totalNum: filteredCount,
    data: {
      data: purchases,
    },
  });
});
exports.createPurchase = catchAsync(async (req, res, next) => {
  const supplierName = await Supplier.findById(req.body.supplier);
  req.body.name = supplierName.name;
  const newPurchase = await Purchase.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      purchase: newPurchase,
    },
  });
});
exports.updatePurchase = catchAsync(async (req, res, next) => {
  const newPurchase = await Purchase.findByIdAndUpdate(
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
      purchase: newPurchase,
    },
  });
});
exports.deletePurchase = catchAsync(async (req, res, next) => {
  await Purchase.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
