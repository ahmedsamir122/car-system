const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "you must rite the type"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "you must write the value"],
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

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
