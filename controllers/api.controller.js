var BaseController = require("./base.controller");

class APIController extends BaseController {
    constructor(){
        //
    }

    run(req,res,next){
        // check path and method are legit

        if ( !( validPaths[req.path] && validPaths[req.path][req.method] ) ) {
            // pass down to 404
            return next()
        }

        validPaths[req.path][req.method](req,res,next);
    }
}

const validPaths = {
    "/api/data/courses":{
        "GET":(req,res,next) => {
            return res.json(tempData);
        },
        "POST":(req,res,next) => {
            return res.send("404")
        }
    }
}