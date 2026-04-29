const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: [true, "the car must has a price"],
    },
    name: {
      type: String,
    },
    paymentType: {
      type: String,
      default: "cash",
      enum: ["cash", "credit"],
      trim: true,
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: [true, "Contract must belong to a user"],
    },
    car: {
      type: mongoose.Schema.ObjectId,
      ref: "Car",
      required: [true, "Contract must belong to a user"],
    },
  },
  {
    timestamps: true, // ✅ CORRECT
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
