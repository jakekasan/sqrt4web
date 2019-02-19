const mongoose = require("mongoose");
const ModulesSchema = require("./modules.schema");

module.exports = mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    modules:[
        ModulesSchema
    ],
    author:Number
})