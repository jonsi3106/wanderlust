import express from "express";
import { connectDB } from "./db/connection.js";
import { initDB } from "./init/addData.js";
import methodOverride from "method-override";
import ejsMate from "ejs-mate"
import {listingRouter} from "./routes/listings.route.js";
import {reviewsRouter} from "./routes/reviews.route.js";
import flash from "connect-flash";
import session, { Cookie } from "express-session";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static("public"));

const sessionOptions ={
    secret: "secret key",
    resave:false,
    saveUninitialized:true,
    Cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})


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