import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import apiRoutes from "./routes/index.js";
import logger from "./config/logger-config.js";
import db from "./models/index.js";
import city from "./models/city.js";
dotenv.config();
const app=express();

const PORT=process.env.PORT;

app.listen(PORT,async()=>{
    console.log(`Successfully runnig on ${PORT}`);
    logger.info("Successfully start the server",{});
//  const city1=await db.City.findByPk(7);
//  const airport1=await city1.createAirport({name:'kempogSSSowda airport',code:'JAK'})
    // const maalKitnahai =await city1.getAirports();
    // await city1.removeAirport();

// This line will throw an error as this line will try to remove the airport from the city 
// But my db says that an 
// jab mai yeh krega toh airport toh rhega but cityid null hojayega and that should not occur...
// we're studying about onDelete Cascade and onUpdate Cascade
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",apiRoutes);
