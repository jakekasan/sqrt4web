const BaseModel = require("./base.model");
const userSchema = require("./schemas/user.schema");

class UsersModel extends BaseModel {

    constructor(connection){
        let model = connection.model("Users",userSchema)
        super(model)
    }
}