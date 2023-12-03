import mongoose, { model } from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        restaurant_id: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("categories", categorySchema);
