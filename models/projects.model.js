const BaseModel = require("./base.model");
const projectsSchema = require("./schemas/projects.schema");

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
        super(model)
    }
}

module.exports = ProjectsModel;