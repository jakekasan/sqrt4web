// const SessionsModel = require("./../../../models/sessions.model");
const UsersModel = require("./../../../models/users.model");

class UserMiddleware {
    constructor(){
        this.name = "User Services";
        // this.sessionsModel = new SessionsModel();
        this.usersModel = new UsersModel();
    }

    run(req,res,next){
        if (req.cookies){
            // find session in model
            this.usersModel.retrieve({cookie_id:req.cookies._id},(data) => {
                if (!data) {
                    return next()
                }
                req.user = data;
                return next()
            })
        }
    }
}

module.exports = UserMiddleware;