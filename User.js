import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            default: 18,
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },

        height: Number,

        weight: Number,

        activityLevel: {
            type: String,
            default: "Moderate",
        },

        goal: {
            type: String,
            default: "Maintain Weight",
        },

        profileImage: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);