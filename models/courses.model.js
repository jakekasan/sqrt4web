const BaseModel = require("./base.model");
const coursesSchema = require("./schemas/courses.schema");
const fetch = require("node-fetch");
var fs = require("fs");
var path = require("path");



let fakeData = require("./../public/courses.json");

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

    getData(callback){
        let dataPath = path.resolve(__dirname,"../public",'courses.json');
        console.log(dataPath);
        var obj = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        return callback(obj)

        // let fakeData = require("./../public/courses.json");
        // for (let course of fakeData){
        //     console.log({
        //         id:course.id,
        //         submodules:course.modules.length
        //     });
        // }
        // return fakeData
    }
}

module.exports = CoursesModel;