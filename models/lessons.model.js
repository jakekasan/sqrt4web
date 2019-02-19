const BaseModel = require("./base.model");
const lessonsSchema = require("./schemas/lessons.schema");
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

class LessonsModel extends BaseModel {
    constructor(connection){
        var connection = connection;
        if (!connection){
            connection = fakeConnection;
        }
        let model = connection.model("Lessons",lessonsSchema);
        super(model)
    }

    getData(callback){
        let dataPath = path.resolve(__dirname,"../public",'lessons.json');
        console.log(dataPath);
        var obj = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        return callback(obj)
    }

    findOne(obj,callback){
        let { id } = obj;

        let dataPath = path.resolve(__dirname,"../public",'lessons.json');

        var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        data = data.filter(item => item.id == id)[0];

        return callback(data)
    }

    findAll(obj,callback){
        let { id } = obj;

        let dataPath = path.resolve(__dirname,"../public",'lessons.json');

        var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        data = data.filter(item => id.includes(item.id));

        return callback(data)
    }
}

module.exports = LessonsModel;