import mongoose, { model } from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        restaurant_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "restaurants",
        },
        category_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "categories",
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        diet: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("items", itemSchema);
