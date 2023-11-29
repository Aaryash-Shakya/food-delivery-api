import mongoose, { model } from "mongoose";

const bannerSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

export default model("banners", bannerSchema);
