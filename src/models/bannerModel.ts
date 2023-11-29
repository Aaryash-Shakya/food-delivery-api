import mongoose, { model } from "mongoose";

const bannerSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            require: true,
        },
        status: {
            type: Boolean,
            require: true,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

export default model("banners", bannerSchema);
