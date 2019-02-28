var BaseController = require("./base.controller");

var tempData = require("./../public/courses.json");

class APIController extends BaseController {
    constructor(params){
        params.name = "API Controller";
        super({ ...params });
    }

    run(req,res,next){
        // check path and method are legit

        var self = this;
        self.req = req;
        self.res = res;
        self.next = next;

        if ( !( self.validPaths[self.req.path] && self.validPaths[self.req.path][self.req.method] ) ) {
            // pass down to 404
            return next()
        } else {
            self.validPaths[self.req.path][self.req.method](self);
        }
    }

    badPath(res){
        return res.json({
            "status":"Bad Request"
        })
    }

    get validPaths() {
        return {
            "/api/courses":{
                "GET":(self) => {
                    if (self.req.query && self.req.query.id) {
                        self.services.coursesService.get
                        return self.res.json(tempData);
                    } else {
                        return self.res.json()
                    }
                    
                },
                "POST":(self) => {
                    return self.badPath(self.req)
                }
            },
            "/api/lessons":{
                "GET":(self) => {
                    if (self.req.query && Object.keys(self.req.query).length > 0){
                        if (self.debug){
                            console.log(`\nAPI Controller\nself.req.query: ${JSON.stringify(self.req.query)}\ncalling getOneLesson()`)
                        }
                        self.services.coursesService.getOneLesson(self.req.query)
                            .then(data => {
                                return self.res.json(data);
                            })
                    } else {
                        if (self.debug){
                            console.log(`\nAPI Controller\nself.req.query: ${JSON.stringify(self.req.query)}\ncalling getLessons()`)
                        }
                        self.services.coursesService.getLessons({})
                            .then(data => {
                                return self.res.json(data);
                            })
                    }
                },
                "POST":(self) => {
                    return self.badPath(self.req)
                }
            },
            "/api/projects":{
                "GET":(self) => {
                    return self.badPath(self.req)
                },
                "POST":(self) => {
                    return self.badPath(self.req)
                }
            },
            "/api/images":{
                "GET": (self) => {
                    // why would I need to get an image from server?

                    // redirect!
                    return self.badPath(self.req)
                },
                "POST": (self) => {
                    // process image, upload to s3 and return address as response
                    return self.badPath(self.req)
                }
            }
        }
    }
}

module.exports = APIController;