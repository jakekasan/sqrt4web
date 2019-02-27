const BaseController = require("./base.controller");
const UsersModel = require("./../models/users.model");
const BaseView = require("./../views/base.view");
const CoursesService = require("./services/courses.service");

module.exports = class LoginController extends BaseController {
    constructor(params){
        // params = new UsersModel(connection);
        super({ ...params });
    }

    run(req,res,next){
        let self = this;
        self.req = req;
        self.res = res;
        self.next = next;

        if (self.paths[self.req.path] && self.paths[self.req.path][self.req.method]){
            return self.paths[self.req.path][self.req.method](self);
        } else {
            return next();
        }
    }

    get paths(){
        return {
            "/admin/course":{
                "GET":(self) => {
                    let view = new BaseView("edit",self.res);
                    
                    return view.render({
                        course: {
                            projects:[],
                            lessons:[]
                        }
                    });

                    if (self.req && self.req.body && self.req.body.id){

                        

                        
                    } else {
                        // edit browse?
                    }
                },
                "POST":(self) => {
                    // handle post

                    let view = new BaseView("login",self.res);
                    
                    return view.render({
                        message:JSON.stringify(self.body)
                    });
                }
            },
            "/admin/lesson":{
                "GET":(self) => {
                    // 
                    let view = new BaseView("login",self.res);

                    return view.render({
                        message:null
                    });
                },
                "POST":(self) => {
                    // handle post

                    let view = new BaseView("login",self.res);
                    
                    return view.render({
                        message:JSON.stringify(self.body)
                    });
                }
            },
            "/admin/project":{
                "GET":(self) => {
                    // 
                    let view = new BaseView("login",self.res);

                    return view.render({
                        message:null
                    });
                },
                "POST":(self) => {
                    // handle post

                    let view = new BaseView("login",self.res);
                    
                    return view.render({
                        message:JSON.stringify(self.body)
                    });
                }
            }
        }
    }
}