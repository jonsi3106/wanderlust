import express, { Router } from "express";
const listingRouter = express.Router();

import { Listing } from "../model/listing.model.js";

//listings
listingRouter.get("/", async (req, res) => {
    const allListings = await Listing.find({})
    res.render("listings.ejs", { allListings })
})

//route to request form for creating new listing
listingRouter.get("/new", (req, res) => {
    res.render("new.ejs")
})

//to edit listing
listingRouter.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const place = await Listing.findById(id);
    res.render("edit.ejs", { place });
})

//show listing
listingRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const place = await Listing.findById(id).populate("reviews");
    res.render("show.ejs", { place })
})

//delete listing
listingRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

// add new listing in db
listingRouter.post("/", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//add changes of edit route in db
listingRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listings/${id}`);
});

export {listingRouter };