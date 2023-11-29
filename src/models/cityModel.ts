import mongoose, { model } from "mongoose";

const citySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("cities", citySchema);
