const mongoose = require("mongoose");

const person_schema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    customer_id: {
        type: String
    }
})


module.exports = mongoose.model("Person", person_schema)