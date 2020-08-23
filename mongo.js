const mongoose = require("mongoose");
//require("dotenv").config();
// require('dotenv').config({
//     path: 'ENV_FILENAME'
// });

require('./config/keys');

mongoose.Promise = global.Promise;
console.log(process.env.MONGOURI)
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})