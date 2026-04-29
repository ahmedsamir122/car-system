const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "the supplier must have a name"],
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, "the supplier must have a phone number"],
    },
    company: {
      type: String,
      required: [true, "the supplier must have a company namy"],
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

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
