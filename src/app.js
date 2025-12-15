import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); //middleware for configurations

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());



//Importing Routes
import  {router}  from "../src/routes/user.routes.js";


// routes declaration
app.use("/api/v1/users", router); // app.use is used instead of app.get because things are now separated and that i have extracted router from express in a different file, so as to use router in this file i would have to bring and use middleware here!!

export { app };
 