const BaseModel = require("./base.model");
const projectsSchema = require("./schemas/projects.schema");

let fakeConnection = require("./fake.connection");

class ProjectsModel extends BaseModel {
    constructor(connection) {
        var connection = connection;
        if (!connection) {
            console.log("Setting filename for Projects Model");
            connection = fakeConnection("projects.json");
        }
        let model = connection.model("Project",projectsSchema);
        super(model);
    }

    findOne(obj,callback){
        // for now, load data from file
        let { id } = obj;

        // let dataPath = path.resolve(__dirname,"../public",'projects.json');

        // var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // data = data.filter(item => item.id == id)[0];

        this.retrieve(obj,(err,data) => {
            if (err) {
                console.log(err);
            }
            return callback(data)
        })
        
    }

    findAll(obj,callback){
        // let { id } = obj;

        // let dataPath = path.resolve(__dirname,"../public",'projects.json');

        // var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // data = data.filter(item => item.id == id)[0];

        this.retrieve(obj,(err,data) => {
            if (err) {
                console.log(err);
            }
            return callback(data)
        })
    }
}

module.exports = ProjectsModel;