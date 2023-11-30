import mongoose, { model } from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        city_id: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        location: {
            type: Object,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        cuisines: {
            type: Array,
            required: true,
        },
        categories: {
            type: Array,
            required: true,
        },
        open_time: {
            type: String,
            required: true,
        },
        close_time: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        delivery_time: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "active",
        },
        isClosed: {
            type: Boolean,
            required: true,
            default: false,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default model("restaurants", restaurantSchema);
