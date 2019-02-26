const BaseController = require("./base.controller");
const UsersModel = require("./../models/users.model");
const BaseView = require("./../views/base.view");

module.exports = class LoginController extends BaseController {
    constructor(params){
        params.name = "Login Controller";
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
            "/login":{
                "GET":(self) => {
                    // just give the login page
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