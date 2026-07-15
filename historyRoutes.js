import express from "express";


import {

    getHistory,

    getSingleHistory,

    deleteHistory

} from "../controllers/historyController.js";


import protect from "../middleware/authMiddleware.js";



const router = express.Router();



// Get all history

router.get(

    "/",

    protect,

    getHistory

);



// Get single report

router.get(

    "/:id",

    protect,

    getSingleHistory

);



// Delete history

router.delete(

    "/:id",

    protect,

    deleteHistory

);



export default router;