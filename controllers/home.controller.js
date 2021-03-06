const BaseController = require("./base.controller");
const BaseView = require("./../views/base.view");

class HomeController extends BaseController {

    constructor(params){
        params.name = "Home Controller";
        super({ ...params });
    }

    run(req,res,next){
        // if (this.debug) {
        //     console.log(`${Date.now()} : ${req.method} request recieved`);
        // }
        var self = this; // for scope
        self.req = req;
        self.res = res;
        self.next = next;
        // self.mongo = self.req.mongo;

        this.getContent(self);
    }

    checkLoggedStatus(self){
        /*
        
            returns either true or false depending on if req has a valid user session with userdata
        
        */

       return false // for now...
    }

    getContent(self){
        // temporary data
        let data = {
            title:"Welcome to SQRT4",
            breadcrumbs:[
                {
                    name:"Home",
                    url:"/"
                }
            ]
        }

        // get data and render template
        let view = new BaseView("home",self.res)
        self.content = data;
        return view.render(self.content);
    }


}

module.exports = HomeController;