'use strict'

require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.SECRET;
const router = require("./router")
const errorHandhlers = require("./middlewares/errorHandlers.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandhlers);

// app.listen(port, () => console.log(`app listening to http://localhost:${port}`))

module.exports = app;