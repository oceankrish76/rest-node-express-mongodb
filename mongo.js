const mongoose = require("mongoose");
require("dotenv").config();
// require('dotenv').config({
//     path: 'ENV_FILENAME'
// });

mongoose.Promise = global.Promise;
console.log(process.env.MONGOURI)
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})