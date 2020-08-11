const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const morgan = require("morgan")
const path = require('path');

//database connection
require("./mongo")

//Models
require("./model/Customer");
require("./model/Person");


//Middleware
app.use(bodyParser.json("combined")).use(morgan("combined"));


// app.set('views', path.join(__dirname, 'views'));
app.set('views', './views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

//Routes
app.get("/", (req, res) => {
    res.render('index');
})
app.get("/login", (req, res) => {
    res.render('login');
})
app.post("/login", (req, res) => {
    res.render('index');
})
app.get("/register", (req, res) => {
    res.render('register');
})
app.post("/register", (req, res) => {
    res.render('register');
})
app.use("/customers", require("./routes/customers"))
app.use("/customers/:customerId/persons/", require("./routes/persons"))
app.listen(3001, function () {
    console.log("Server is running on port 3001");
})

module.exports = app;