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

        console.log("Set self");

        self.req = req;
        self.res = res;
        self.next = next;
        self.mongo = self.req.mongo;

        if (req.path == "/courses") {
            this.browseCourses(self);
        }

        if (req.path == "/view/course") {
            this.singleCourse(self);
        }


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
        let view = new BaseView("courses",self.res)
        self.content = data;
        return view.render(self.content);
    }

    singleCourse(self){
        // gets course by id

        let id = 0;

        let courses = self.coursesModel.getData();

        let course = courses.filter(item => item.id == id)[0];

        let data = {};

        data.course = course;

        self.content = data;

        // let view = new BaseView("view-course",self.res);
        let view = new BaseView("test2",self.res);

        return view.render(self.content)

        

    }


}

module.exports = CoursesController;