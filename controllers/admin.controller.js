const BaseController = require("./base.controller");
const UsersModel = require("./../models/users.model");
const BaseView = require("./../views/base.view");
const CoursesService = require("./services/courses.service");
const ProjectsService = require("./services/projects.service");

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

                    if (self.req && self.req.query && self.req.query.id){
                        self.services.coursesService.getCourse({ ...self.req.query})
                            .then(course => {
                                if (!course.projects){
                                    course.projects = [];
                                }
                                self.services.projectsService.getProjectByID(course.projects)
                                    .then(projects => {
                                        course.projects = projects;

                                        return view.render({
                                            course: course
                                        })
                                    })
                            })
                    } else {
                        // edit browse?
                        return view.render({
                            course: {
                                projects:[],
                                lessons:[]
                            }
                        });
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