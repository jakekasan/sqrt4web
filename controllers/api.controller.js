var BaseController = require("./base.controller");

var tempData = require("./../public/courses.json");

class APIController extends BaseController {
    constructor(params){
        params.name = "API Controller";
        super({ ...params });
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
    "/api/courses":{
        "GET":(req,res,next) => {
            return res.json(tempData);
        },
        "POST":(req,res,next) => {
            return res.send("404")
        }
    },
    "/api/lessons":{
        "GET":() => {},
        "POST":() => {}
    },
    "/api/projects":{
        "GET":() => {

        },
        "POST":() => {

        }
    },
    "/api/images":{
        "GET": (req,res,next) => {
            // why would I need to get an image from server?

            // redirect!
            res.send(404);
        },
        "POST": (req,res,next) => {
            // process image, upload to s3 and return address as response
        }
    }
}

module.exports = APIController;