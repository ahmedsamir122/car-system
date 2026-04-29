const mongoose = require("mongoose");

const installmentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "you must write a value"],
    },
    status: {
      type: String,
      default: "paid",
      enum: ["paid", "not yet"],
      trim: true,
    },
    dueDate: {
      type: Date,
      default: "cash",
      enum: ["cash", "credit"],
    },

    sale: {
      type: mongoose.Schema.ObjectId,
      ref: "Sale",
      required: [true, "Installment must belong to a bill"],
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

const Installment = mongoose.model("Installment", installmentSchema);

module.exports = Installment;
