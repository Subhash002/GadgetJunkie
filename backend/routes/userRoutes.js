import express from "express";
import {
  authUser,
  registerUser,
  logOutUser,
  getUserById,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateUser,
  getUsers,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/auth", authUser);
router.post("/logout", logOutUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);
export default router;
