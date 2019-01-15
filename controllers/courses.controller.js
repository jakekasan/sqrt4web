const BaseController = require("./base.controller");
const BaseView = require("./../views/base.view");

class CoursesController extends BaseController {

    constructor(debug){
        super("Courses Controller");
        this.debug = debug;
    }

    run(req,res,next){
        if (this.debug) {
            console.log(`${(new Date(Date.now()))} : ${req.method} request to  recieved`);
        }
        var self = this; // for scope
        console.log("Set self");
        self.req = req;
        self.res = res;
        self.next = next;
        self.mongo = self.req.mongo;

        this.getContent(self);


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

    getContent(self){
        console.log("In get content");
        // temporary data
        let data = {
            title:"Welcome to SQRT4"
        }

        // get data and render template
        let view = new BaseView("courses",self.res)
        self.content = data;
        return view.render(self.content);
    }


}

module.exports = CoursesController;