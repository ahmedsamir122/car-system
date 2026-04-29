const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: [true, "the car must has a price"],
    },
    name: {
      type: String,
    },
    supplier: {
      type: mongoose.Schema.ObjectId,
      ref: "Supplier",
      required: [true, "you must write the supplier data"],
    },
    car: {
      type: mongoose.Schema.ObjectId,
      ref: "Car",
      required: [true, "you must write the car data"],
    },
    date: {
      type: Date,
      default: Date.now(),
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

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
