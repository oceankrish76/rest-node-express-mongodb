const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const morgan = require("morgan")

//database connection
require("./mongo")

//Models
require("./model/Customer");


//Middleware
app.use(bodyParser.json("combined")).use(morgan("combined"));

//Routes
app.use("/customers", require("./routes/customers"))

app.listen(3001, function () {
    console.log("Server is running on port 3001");
})