const BaseController = require("./base.controller");
const BaseView = require("./../views/base.view");

class HomeController extends BaseController {

    constructor(debug){
        super("Home Controller");
        this.debug = debug;
    }

    run(req,res,next){
        console.log("Running run");
        if (this.debug) {
            console.log(`${Date.now()} : ${req.method} request recieved`);
        }
        var self = this; // for scope
        console.log("Set self");
        self.req = req;
        self.res = res;
        self.next = next;
        self.mongo = self.req.mongo;

        console.log("Running getContent");
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

       return false // for now...
    }

    getContent(self){
        console.log("In get content");
        // temporary data
        let data = {
            title:"Welcome to SQRT4"
        }

        // get data and render template
        let view = new BaseView("main",self.res)
        self.content = data;
        return view.render(self.content);
    }


}

module.exports = HomeController;