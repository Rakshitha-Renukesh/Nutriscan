import express from "express";

import {
    getUserDetails,
    updateUserDetails,
    deleteAccount
} from "../controllers/userController.js";


import protect from "../middleware/authMiddleware.js";


const router = express.Router();



// Get Profile

router.get(
    "/profile",
    protect,
    getUserDetails
);



// Update Profile

router.put(
    "/profile",
    protect,
    updateUserDetails
);



// Delete Account

router.delete(
    "/delete",
    protect,
    deleteAccount
);



export default router;