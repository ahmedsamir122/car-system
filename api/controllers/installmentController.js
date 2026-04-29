const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Installment = require("../models/installmentModel");

exports.getAllInstallments = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Installment.find(), req.query).filter();

  // 2️⃣ Clone query BEFORE pagination
  const filteredQuery = features.query.clone();

  // 3️⃣ Get filtered count
  const filteredCount = await filteredQuery.countDocuments();

  // 4️⃣ Apply باقي العمليات
  features.sort().limitFields().paginate();

  const installments = await features.query;

  res.status(200).json({
    status: "success",
    totalNum: filteredCount,
    data: {
      data: installments,
    },
  });
});
exports.createInstallment = catchAsync(async (req, res, next) => {
  const newInstallment = await Installment.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      installment: newInstallment,
    },
  });
});
exports.updateInstallment = catchAsync(async (req, res, next) => {
  const newInstallment = await Installment.findByIdAndUpdate(
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
      installment: newInstallment,
    },
  });
});
exports.deleteInstallment = catchAsync(async (req, res, next) => {
  await Installment.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
