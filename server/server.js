import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbCon.js";


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');
dotenv.config();


connectDB ();

app.get('/ping', (req, res) => {
    res.send('PONG');
})


app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);


app.use(express.urlencoded({ extended: true}));
app.use(express.json);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is runinng on port ${PORT}`);
});