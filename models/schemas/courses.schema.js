const mongoose = require("mongoose");

module.exports = mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    modules:[{
        order: Number,
        timeToComplete: Number // amount of minutes to complete
    }],
    participants:[{
        id:Number,
        type:String
    }]
})