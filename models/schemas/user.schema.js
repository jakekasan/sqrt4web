const mongoose = require("mongoose");

module.exports = mongoose.Schema({
    id: Number,
    username: String, // required
    passwordHash: String, // required
    contacts:[]
})