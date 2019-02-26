const BaseModel = require("./base.model");
const lessonsSchema = require("./schemas/lessons.schema");
const fetch = require("node-fetch");
var fs = require("fs");
var path = require("path");

var fakeConnection = require("./fake.connection")

class LessonsModel extends BaseModel {
    constructor(connection){
        var connection = connection;
        if (!connection){
            connection = fakeConnection("lessons.json");
        }
        let model = connection.model("Lesson",lessonsSchema);
        super(model);
    }

    getData(callback){
        // let dataPath = path.resolve(__dirname,"../public",'lessons.json');
        // console.log(dataPath);
        // var obj = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        this.retrieve({},(err,data) => {
            if (err) {
                console.log(err);
            }
            return callback(data)
        })
    }

    findOne(obj,callback){
        // let { id } = obj;

        // let dataPath = path.resolve(__dirname,"../public",'lessons.json');

        // var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // data = data.filter(item => item.id == id)[0];

        this.retrieve(obj,(err,data) => {
            if (err) {
                console.log(err);
            }
    
            let result = data.pop();

            return callback(result,null)
        })

        // return callback(data)
    }

    findAll(obj,callback){
        // let { id } = obj;

        // let dataPath = path.resolve(__dirname,"../public",'lessons.json');

        // var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // data = data.filter(item => id.includes(item.id));

        this.retrieve(obj,(err,data) => {
            if (err) {
                console.log(err);
            }
            return callback(data)
        })

        return callback(data)
    }
}

module.exports = LessonsModel;