import express from "express";
import { connectDB } from "./db/connection.js";

import methodOverride from "method-override";
import ejsMate from "ejs-mate"
import {listingRouter} from "./routes/listings.route.js";
import {reviewsRouter} from "./routes/reviews.route.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static("public"));


connectDB();

const port = 8080;

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewsRouter);


app.get("/", (req, res) => {
    console.log("on root directory");
    res.send("on root directory");

})






app.listen(port, () => {
    console.log("server is working");
})