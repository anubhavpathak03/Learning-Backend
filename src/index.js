// require("dotenv").config({path: './env'});

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/index.js";

const app = express();

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    // handling server
    app.on("error", (err) => {
      console.log("Hey Catched Some ERROR while connecting to server: ", err);
      throw err;
    });


    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port : ${process.env.PORT }`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed!!!", err)
})





/** 
import express from "express";
const app = express();

( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (err) => {
            console.log("ERROR: ", err);
            throw err;
        })
        
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("Error: ", error);
        throw err
    }
})()
    
*/
