import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
// import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";

export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role === "admin")
    return next(new ErrorHandler("Admin can't buy subscription", 400));

  if (user.subscription.status === "active")
    return next(new ErrorHandler("You have subscribed already", 400));

  const { name, number, expiry, cvc } = req.body;

  if (!name || !number || !expiry || !cvc)
    return next(new ErrorHandler("Please add all fields", 400));

  const payment = await Payment.create({
    name,
    number,
    expiry,
    cvc,
  })

  user.subscription.id = payment._id;
  user.subscription.status = 'active';

  await user.save();

  res.status(201).json({
    success: true,
    message: "Subscription Successful",
  });
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_signature, razorpay_payment_id, razorpay_subscription_id } =
    req.body;

  const user = await User.findById(req.user._id);

  const subscription_id = user.subscription.id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");

  const isAuthentic = generated_signature === razorpay_signature;

  if (!isAuthentic)
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);

  // database comes here
  await Payment.create({
    razorpay_signature,
    razorpay_payment_id,
    razorpay_subscription_id,
  });

  user.subscription.status = "active";

  await user.save();

  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
  );
});

export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const payment = await Payment.findById(req.payment._id);
  console.log(user, payment);
  if (user.subscription.id === payment._id)
    await payment.remove();
    user.subscription.id = undefined;
    user.subscription.status = undefined;
    await user.save();

  res.status(200).json({
    success: true,
    message: 
       "Subscription cancelled, You will receive full refund within 7 days."
  });
});
