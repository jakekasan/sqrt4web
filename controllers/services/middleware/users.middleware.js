const SessionsModel = require("./../../../models/sessions.model");

class UserMiddleware {
    constructor(){
        this.name = "User Services";
        this.sessionsModel = new SessionsModel();
    }

    run(req,res,next){
        if (req.cookies){
            // find session in model
            this.sessionsModel.retrieve({cookie_id:req.cookies._id},(data) => {
                if (!data) {
                    next();
                }
            })
        }
    }
}