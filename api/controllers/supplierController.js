const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Supplier = require("../models/supplierModel");
const Purchase = require("../models/purchaseModel");

exports.getAllSuppliers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Supplier.find(), req.query).filter();

  // 2️⃣ Clone query BEFORE pagination
  const filteredQuery = features.query.clone();

  // 3️⃣ Get filtered count
  const filteredCount = await filteredQuery.countDocuments();

  // 4️⃣ Apply باقي العمليات
  features.sort().limitFields().paginate();

  const suppliers = await features.query;

  res.status(200).json({
    status: "success",
    totalNum: filteredCount,
    data: {
      data: suppliers,
    },
  });
});
exports.createSupplier = catchAsync(async (req, res, next) => {
  const newSupplier = await Supplier.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      Supplier: newSupplier,
    },
  });
});
exports.updateSupplier = catchAsync(async (req, res, next) => {
  const newSupplier = await Supplier.findByIdAndUpdate(
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
      Supplier: newSupplier,
    },
  });
});
exports.deleteSupplier = catchAsync(async (req, res, next) => {
  const supplierId = req.params.id;

  await Supplier.findByIdAndDelete(req.params.id);
  await Purchase.deleteMany({ supplier: supplierId });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
