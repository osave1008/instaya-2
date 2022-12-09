require("dotenv").config();
const express = require("express");
// import express from "express";
const cookieParser = require("cookie-parser");
// import cookieParser from "cookieParser";
const conn = require("./db");
// import asyncHandler from "express-async-Handler"
const authRoutes = require("./routes/authRoutes");
const privateRoutes = require("./routes/privateRoutes");
const checkAuth = require("./middlewares/checkAuth");
const app = express();
const cors = require("cors");
const orders = require("./routes/orders");

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());    
    //Router de rutas protegidas

    //Router de rutas de autenticacion
app.use("/auth", authRoutes);
app.use("/private", checkAuth, privateRoutes);
app.use("/private", checkAuth, orders);


app.listen(3001, () => {
    console.log("API REST STARTED ...http://localhost:3001/");
    conn();
});

