import express from "express";
const router = express.Router();
import qrController from "../controllers/qrController.js"
import tokenValidation from "../middleware/tokenValidation.js";
router.post("/", tokenValidation, qrController.generateQR);
router.get("/",tokenValidation,qrController.getAllQRs)
export default router;