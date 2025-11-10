import express from "express";
import { getAllUsers ,getAllContacts, deleteUserByID, getUserByID, updateUserByID, deleteUserFromContactsByID } from "../controllers/admin-controller.js";
import { authMiddleware} from "../middlewares/auth-middleware.js"
import { adminMiddleware } from "../middlewares/admin-middleware.js";
import { verifyAdminKey } from "../controllers/auth-controller.js";
const router= express.Router();


router.route("/users").get(authMiddleware,adminMiddleware, getAllUsers);
router.route("/users/:id").get(authMiddleware,adminMiddleware, getUserByID);
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts);
router.route("/users/update/:id").patch(authMiddleware , adminMiddleware, updateUserByID)
router.route("/users/delete/:id").delete(authMiddleware , adminMiddleware, deleteUserByID)
router.route("/contacts/delete/:id").delete(authMiddleware , adminMiddleware, deleteUserFromContactsByID)
router.route("/verify-admin").post(authMiddleware,  verifyAdminKey);



export default router;