import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";

export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role === "admin")
    return next(new ErrorHandler("Admin can't buy subscription", 400));

  if (user.subscription.status === "active")
    return next(new ErrorHandler("You have subscribed already", 400));

  user.subscription.status = 'active';

  await user.save();

  res.status(201).json({
    success: true,
    message: "Subscription Successful",
  });
});

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
 
  user.subscription.status = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: 
       "Subscription cancelled"
  });
});
