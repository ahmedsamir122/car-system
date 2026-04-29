const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "the customer must have a name"],
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, "the customer must have a phone number"],
    },
    ID: {
      type: Number,
      required: [true, "the customer must have a ID"],
    },
    address: {
      type: String,
      required: [true, "the customer must have a address"],
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

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
