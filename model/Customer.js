const mongoose = require("mongoose");

const customer_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model("Customer", customer_schema)