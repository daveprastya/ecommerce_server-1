'use strict'

if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}
// require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT | 3000;
const router = require("./router");
const cors = require("cors");
const errorHandhlers = require("./middlewares/errorHandlers.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(router);
app.use(errorHandhlers);

app.listen(port, () => console.log(`app listening to http://localhost:${port}`))

module.exports = app;