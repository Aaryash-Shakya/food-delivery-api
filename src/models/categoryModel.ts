import mongoose, { model } from "mongoose";

const categorySchema = new mongoose.Schema(
    {
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
