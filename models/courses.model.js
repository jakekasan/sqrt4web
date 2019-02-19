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
    }

    findOne(query,callback){
        let { id, title } = query;

        // model methods will come here
        let dataPath = path.resolve(__dirname,"../public",'courses.json');
        var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        data = data.filter(item => item.id == id);

        return callback(data)
    }
}

module.exports = CoursesModel;