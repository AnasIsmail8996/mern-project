import express from "express";
import { services, addServices } from "../controllers/service-controller.js";

const router = express.Router();


router.route('/service').get(services);
router.route("/service").post(addServices);

export default router;