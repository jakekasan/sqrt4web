const mongoose = require("mongoose");

module.exports = mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    participants:[{
        id:Number,
        type:String
    }]
})