const mongoose = require("mongoose");
//const LessonsSchema = require("./lessons.schema");

module.exports = mongoose.Schema({
    title: String,
    description: String,
    lessonIDs:[
        Number
    ]
})
