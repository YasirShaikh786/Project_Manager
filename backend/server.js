import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import {connectDb}from "./db/connectDatabase.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();	

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
	  origin: process.env.CLIENT_URL, // Frontend URL
	  credentials: true, // Allow cookies
	  allowedHeaders: ['Authorization', 'Content-Type'],
	})
  );

  app.use(bodyParser.urlencoded({ extended: true }));




// Routes

app.use("/api/auth",authRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/users",userRoutes);



// Start Server
// server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDb();
});
