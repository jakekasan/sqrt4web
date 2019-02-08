const BaseController = require("./base.controller");
const BaseView = require("./../views/base.view");
const CoursesModel = require("./../models/courses.model");

class CoursesController extends BaseController {

    constructor(debug){
        super("Courses Controller");
        this.debug = debug;
        this.coursesModel = new CoursesModel();
    }

    run(req,res,next){
        if (this.debug) {
            console.log(`${(new Date(Date.now()))} : ${req.method} request to ${req.path} recieved`);
        }
        
        var self = this; // for scope

        self.req = req;
        self.res = res;
        self.next = next;
        self.mongo = self.req.mongo;

        console.log("Courses Controller");
        console.log(this.paths["/courses"]["GET"])
        if (this.paths[self.req.path] && this.paths[self.req.path][self.req.method]){
            this.paths[self.req.path][self.req.method](self);
        } else {
            next();
        }

        // if (req.query && req.query.id){
        //     return this.singleCourse(self);
        // } else {
        //     return this.browseCourses(self);
        // }

        // if (req.path == "/view/course") {
        //     this.singleCourse(self);
        // }


        // if (self.checkLoggedStatus(self)){
        //     self.getContent(self);
        // } else {
        //     self.getContent(self);
        // }
    }

    checkLoggedStatus(self){
        /*
        
            returns either true or false depending on if req has a valid user session with userdata
        
        */

       return true // for now...
    }

    browseCourses(self){
        console.log("In get content");
        // temporary data
        // let data = {
        //     title:"Welcome to SQRT4"
        // }

        let data = {};

        data.courses = self.coursesModel.getData();

        // get data and render template
        let view = new BaseView("test",self.res)
        self.content = data;
        return view.render(self.content);
    }

    singleCourse(self){
        // gets course by id

        let id = self.req.query.id;

        // replace with model lookup EVENTUALLY
        let courses = self.coursesModel.getData();

        let course = courses.filter(item => item.id == id)[0];

        let data = {};

        if (course) {
            data.course = course;
        } else {
            data.course = courses[0];
        }

        self.content = data;

        let view = new BaseView("test2",self.res);

        return view.render(self.content)
    }

    get paths(){
        return {
            "/courses":{
                "GET":(self) => {
                    if (self.req.query && self.req.query.id){
                        return this.singleCourse(self);
                    } else {
                        return this.browseCourses(self);
                    }
                },
                "POST":(self) => {
                    // process POST
                    console.log(self.req.body);
                    self.res.redirect("/courses");
                }
            }
        }
    }


}

module.exports = CoursesController;