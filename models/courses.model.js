const BaseModel = require("./base.model");
const coursesSchema = require("./schemas/courses.schema");
const fetch = require("node-fetch");
var fs = require("fs");
var path = require("path");

// fake connection to use static files
var fakeConnection = require("./fake.connection");

class CoursesModel extends BaseModel {
    constructor(params){
        let { connection } = params;
        if (!connection){
            params.dataFileName = "courses.json";
            connection = fakeConnection(params);
        }
        params.model = connection.model("Course",coursesSchema);
        super(params);
    }

    getData(callback){
        // let dataPath = path.resolve(__dirname,"../public",'courses.json');
        // console.log(dataPath);
        // var obj = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        this.retrieve({},(err,data) => {
            if (err) {
                console.log(err)
            }
            return callback(data)
        })
    }

    findOne(query,callback){
        // let { id, title } = query;

        // // model methods will come here
        // let dataPath = path.resolve(__dirname,"../public",'courses.json');
        // var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // data = data.filter(item => item.id == id).pop();

        this.retrieve({ ...query},(err,data) => {
            if (err) {
                console.log(err);
            }
            return callback(data.pop())
        })
    }
}

module.exports = CoursesModel;