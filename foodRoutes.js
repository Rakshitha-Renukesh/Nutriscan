import express from "express";

import {
    analyzeFood
} from "../controllers/foodController.js";


import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();



// Analyze Food Image

router.post(

    "/analyze",

    protect,

    upload.single("image"),

    analyzeFood

);



export default router;s