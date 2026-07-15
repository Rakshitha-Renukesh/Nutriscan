import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        analysis: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodAnalysis",
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

export default mongoose.model("History", historySchema);