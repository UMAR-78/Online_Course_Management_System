import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { register, login, logout, getMyProfile, changePassword, updateProfile, forgetPassword, resetPassword, addToCourselist, removeFromCourselist } from "../controllers/userController.js";

const router = express.Router();

// To register a new user
router.route("/register").post(register);

// Login
router.route("/login").post(login);

// logout
router.route("/logout").get(logout);

// Get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// ChangePassword
router.route("/changepassword").put(isAuthenticated, changePassword);

// UpdateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// ForgetPassword
router.route("/forgetpassword").post(forgetPassword);

// ResetPassword
router.route("/resetpassword/:token").put(resetPassword);

// AddtoPlaylist
router.route("/addtocourselist").post(isAuthenticated, addToCourselist);

// RemoveFromPlaylist
router.route("/removefromcourselist").delete(isAuthenticated, removeFromCourselist);

export default router;