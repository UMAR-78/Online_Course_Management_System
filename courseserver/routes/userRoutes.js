import express from "express";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";
// import singleUpload from "./middlewares/multer.js";
import { register, login, logout, getMyProfile, changePassword, updateProfile, forgetPassword, resetPassword, addToPlaylist, removeFromPlaylist, getAllUsers, updateUserRole, deleteUser, deleteMyProfile, updateuserProfile } from "../controllers/userController.js";

const router = express.Router();

// To register a new user
router.route("/register").post(register);

// Login
router.route("/login").post(login);

// logout
router.route("/logout").get(logout);

// Get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// ChangePassword
router.route("/changepassword").put(isAuthenticated, changePassword);

// UpdateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

router.route("/updateuserprofile").put(isAuthenticated, updateuserProfile);

// // UpdateProfilePicture
// router
//   .route("/updateprofilepicture")
//   .put(isAuthenticated, singleUpload, updateprofilepicture);

// ForgetPassword
router.route("/forgetpassword").post(forgetPassword);

// ResetPassword
router.route("/resetpassword/:token").put(resetPassword);

// AddtoPlaylist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// RemoveFromPlaylist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

//  Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
   .route("/admin/user/:id")
   .put(isAuthenticated, authorizeAdmin, updateUserRole)
   .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;