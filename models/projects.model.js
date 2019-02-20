const BaseModel = require("./base.model");
const projectsSchema = require("./schemas/projects.schema");
const path = require("path");
const fs = require("fs");

fakeConnection = {
    model: function(string,schema) {
        return {
            string,
            schema
        }
    }
}

class ProjectsModel extends BaseModel {
    constructor(connection) {
        var connection = connection;
        if (!connection) {
            connection = fakeConnection;
        }
        let model = connection.model("Projects",projectsSchema);
        super(model);
    }

    findOne(obj,callback){
        // for now, load data from file
        let { id } = obj;

        let dataPath = path.resolve(__dirname,"../public",'projects.json');

        var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        data = data.filter(item => item.id == id)[0];

        return callback(data)
    }

    findAll(obj,callback){
        let { id } = obj;

        let dataPath = path.resolve(__dirname,"../public",'projects.json');

        var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // data = data.filter(item => item.id == id)[0];

        return callback(data)
    }
}

module.exports = ProjectsModel;