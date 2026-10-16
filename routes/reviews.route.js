import express from "express";
const reviewsRouter = express.Router({ mergeParams: true });
import { Listing } from "../model/listing.model.js";
import { Review } from "../model/review.model.js";


reviewsRouter.post("/", async (req, res) => {

    const newReview = new Review(req.body.review);
    const listing = await Listing.findById(req.params.id);
    listing.reviews.push(newReview._id);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Added  Successfully");
    res.redirect(`/listings/${req.params.id}`);

})


reviewsRouter.delete("/:reviewId", async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId)
    req.flash("error", "Deleted Review Successfully")
    res.redirect(`/listings/${id}`)
})

export { reviewsRouter };