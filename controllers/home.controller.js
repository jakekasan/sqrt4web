const BaseController = require("./base.controller");
const BaseView = require("./../views/base.view");

class HomeController extends BaseController {

    constructor(){
        super("Home Controller");
    }

    run(req,res,next){
        var self = this; // for scope

        self.req = req;
        self.res = res;
        self.next = next;

        if (this.checkLoggedStatus(self)){
            this.getContent(self);
        } else {
            this.getContent(self);
        }
    }

    checkLoggedStatus(self){
        /*
        
            returns either true or false depending on if req has a valid user session with userdata
        
        */

       return false // for now...
    }

    getContent(self){
        // temporary data
        data = {
            title:"Welcome to SQRT4"
        }

        // get data and render template
        let view = new BaseView("home",self.res)
        self.content = data;
        return view.render(self.content);
    }


}

module.exports = HomeController;