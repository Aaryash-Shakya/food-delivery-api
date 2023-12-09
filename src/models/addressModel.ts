import mongoose, { model } from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
        title: { type: String, required: true },
        address: { type: String, required: true },
        landmark: { type: String, required: true },
        house: { type: String, required: true },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default model("addresses", addressSchema);
