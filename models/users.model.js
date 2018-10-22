const BaseModel = require("./base.model");
const userSchema = require("./schemas/users.schema");

var fakeConnection = {
    model: function(string,schema){
        return {
            string,
            schema
        }
    }
}


class UsersModel extends BaseModel {

    constructor(connection){
        var connection = connection;
        if (!connection){
            connection = fakeConnection;
        }
        let model = connection.model("Users",userSchema);
        super(model);
    }
}

module.exports = UsersModel;