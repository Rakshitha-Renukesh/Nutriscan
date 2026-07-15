import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        foodName: String,

        imageUrl: String,

        calories: Number,

        protein: Number,

        carbohydrates: Number,

        fat: Number,

        fiber: Number,

        sugar: Number,

        sodium: Number,

        confidence: Number,

        aiResponse: Object,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("FoodAnalysis", foodSchema);