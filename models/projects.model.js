const BaseModel = require("./base.model");
const projectsSchema = require("./schemas/projects.schema");

let fakeConnection = require("./fake.connection");

class ProjectsModel extends BaseModel {
    constructor(params){
        let { connection } = params;
        if (!connection){
            params.dataFileName = "projects.json";
            connection = fakeConnection(params);
        }
        params.model = connection.model("Project",projectsSchema);
        super(params);
    }

    findOne(obj,callback){
        this.retrieve(obj,(err,data) => {
            if (err) {
                console.log(err);
            }
            return callback(data,err)
        })
        
    }

    findAll(obj,callback){
        this.retrieve(obj,(err,data) => {
            if (err) {
                console.log(err);
            }
            return callback(data,err)
        })
    }
}

module.exports = ProjectsModel;