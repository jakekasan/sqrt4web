const BaseController = require("./base.controller");


class HomeController extends BaseController {

    constructor(){
        super("Home Controller");
    }

    run(){
        // nothing for now
    }


}

module.exports = HomeController;