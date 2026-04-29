const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "the car must have a brand"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "the car must have a model"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "the car must have a year"],
    },
    price: {
      type: Number,
      required: [true, "the car must have a price"],
    },
    status: {
      type: String,
      default: "available",
      enum: ["available", "sold"],
      trim: true,
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

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
