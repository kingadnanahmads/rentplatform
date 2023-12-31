import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

// mongoose connection settings
mongoose.connect(process.env.MONGO_URI, {
    dbName: "InstantLease",
})
.then(() => console.log("mongodb connected"))
.catch((e) => console.log(e));

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());


app.listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`);
})
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

// error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});