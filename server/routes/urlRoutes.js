import express from "express";

import tokenValidation from "../middleware/tokenValidation.js";
import urlController from "../controllers/urlController.js"
const router = express.Router();


router.post("/", tokenValidation, urlController.generateShortUrl);

router.get("/",tokenValidation, urlController.getUrls);
router.get("/:shortUrl", urlController.redirectShortUrl);
router.delete("/:id", tokenValidation, urlController.deleteShortUrl);

export default router;
