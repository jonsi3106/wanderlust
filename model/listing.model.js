import mongoose, { SchemaType, SchemaTypeOptions } from "mongoose";
import { Review } from "./review.model.js";

const listing = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            filename: { type: String },
            url: { type: String }
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        location: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        reviews: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Review",
            }
        ]

    },
    { timestamps: true }
);

export const Listing = mongoose.model("Listing", listing);