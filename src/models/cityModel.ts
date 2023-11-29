import { Double } from "mongodb";
import mongoose, { model } from "mongoose";

const citySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        latitude: {
            type: Double,
            require: true,
        },
        longitude: {
            type: Double,
            require: true,
        },
        status: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("cities", citySchema);
