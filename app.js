// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
//require("dotenv").config();
import dotenv from 'dotenv';
dotenv.config();

// ℹ️ Connects to the database
//require("./db");
import './db/index.js';

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
//const express = require("express");
import express from 'express';

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
//require("./config")(app);
import middleware from './config/index.js';
middleware(app);

// 👇 Start handling routes here
//const indexRoutes = require("./routes/index.routes");
import indexRoutes from './routes/index.routes.js';
app.use("/api", indexRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
//require("./error-handling")(app);
import errorHandlin from './error-handling/index.js';
errorHandlin(app);

export default app;
