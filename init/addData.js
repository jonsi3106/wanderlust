import mongoose from "mongoose";
import { listingData } from "./data.js";
import { Listing } from "../model/listing.model.js";
import { Review } from "../model/review.model.js";

const initDB = async () => {
  await Listing.deleteMany({});
  await Review.deleteMany({});
  await Listing.insertMany(listingData);
  console.log("data was initialized");
  
};

initDB()

export {initDB}