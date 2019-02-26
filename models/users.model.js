const BaseModel = require("./base.model");
const userSchema = require("./schemas/users.schema");

var fakeConnection = require("./fake.connection");

class UsersModel extends BaseModel {

    constructor(connection){
        var connection = connection;
        if (!connection){
            console.log("Setting filename for Users Model");
            connection = fakeConnection("users.json");
        }
        let model = connection.model("User",userSchema);
        super(model);
    }

    findOne(obj,callback){
        let { id } = obj;

        let dataPath = path.resolve(__dirname,"../public",'users.json');

        var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        data = data.filter(item => item.id == id)[0];

        return callback(data)
    }

    findAll(obj,callback){
        // let { id } = obj;

        let dataPath = path.resolve(__dirname,"../public",'users.json');

        var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        data = data.filter(item => id.includes(item.id));

        return callback(data)
    }

    createNew(obj,callback){

    }
}

module.exports = UsersModel;