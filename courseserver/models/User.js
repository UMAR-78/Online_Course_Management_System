import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
// import { UserAudit } from "./UserAudit.js";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please enter your role"],
    enum: ["admin", "user"],
    default: "user",
  },

  subscription: {
    id: String,
    status: String,
  },
  
  playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: String,
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// schema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     this.previousData = this.toObject();
//     return next();
//   }

//   this.password = await bcrypt.hash(this.password, 10);
//   this.previousData = this.toObject();
//   next();
// }); 

schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

schema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// schema.post(["save", "updateOne", "deleteOne"], async function (doc, next) {
//   const action = this.op; // "save", "updateOne", "deleteOne"
//   const previousUser = this._conditions;
//   const currentUser = doc.toObject();

//   try {
//     await UserAudit.create({
//       action,
//       previousUser,
//       currentUser,
//     });
//   } catch (error) {
//     console.error("Error creating UserAudit:", error);
//   }

//   next();
// });

export const User = mongoose.model("User", schema);
