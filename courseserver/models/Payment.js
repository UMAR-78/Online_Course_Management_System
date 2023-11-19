import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter card holder name"],
  },
  number: {
    type: Number,
    required: [true, "Please enter card number"],
    minLength: [14, "Number must be at least 14 digits"],
  },
  expiry: {
    type: String,
    required: [true, "Format MM/YY"],
  },
  cvc: {
    type: Number,
    required: [true, "Please enter 3 digit code at the back of the card"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", schema);


