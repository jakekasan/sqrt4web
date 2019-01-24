const BaseModel = require("./base.model");
const coursesSchema = require("./schemas/courses.schema");

const fakeData = require("./../public/data.json");

var fakeConnection = {
    model: function(string,schema){
        return {
            string,
            schema
        }
    }
}

class CoursesModel extends BaseModel {
    constructor(connection){
        var connection = connection;
        if (!connection){
            connection = fakeConnection;
        }
        let model = connection.model("Courses",coursesSchema);
        super(model)
    }

    getData(){
        return fakeData
    }
}

module.exports = CoursesModel;