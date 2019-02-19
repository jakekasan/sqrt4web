const BaseController = require("./base.controller");
const BaseView = require("./../views/base.view");
const LessonsModel = require("./../models/lessons.model");

class LessonController extends BaseController {
    constructor(debug){
        super("Lesson Controller");
        this.debug = debug;
        this.lessonsModel = new LessonsModel();
    }

    run(req,res,next){
        const self = this;
        self.req = req;
        self.res = res;
        self.next = next;

        if (this.routes && this.routes[self.req.path] && this.routes[self.req.path][self.req.method]){
            return this.routes[self.req.path][self.req.method](self);
        } else {
            return self.next();
        }


    }

    getContent(obj,callback){
        this.lessonsModel.findOne(obj,(data,err) => {
            return callback(data,err);
        })
    }


    get routes(){
        return {
            "/lesson":{
                "GET":(self) => {
                    // view course intro
                    if (self.req && self.req.query && self.req.query.id){
                        self.getContent({
                            id:self.req.query.id
                        },(data,err) => {
                            if (err) {
                                console.log(err);
                                return self.next();
                            }

                            let view = new BaseView("lesson",self.res);

                            return view.render({
                                lesson:data,
                                breadcrumbs:[
                                    {
                                        name:"Home",
                                        url:"/",
                                    },
                                    {
                                        name:"Course Browser",
                                        url:"/courses"
                                    },
                                    {
                                        name:"Parent Course",
                                        type:"Course",
                                        url:"/courses"
                                    },
                                    {
                                        name:data.title,
                                        type:"Lesson",
                                        url:`/lesson?id=${data.id}`
                                    }
                                ]
                            });
                        })
                    } else {
                        return self.next();
                    }
                },
                "POST":(self) => {
                    // nothing yet
                    return self.next();
                }
            },
            "/lesson/edit":{
                "GET":(self) => {
                    // view actual course
                    return self.next()
                },
                "POST":(self) => {
                    // dunno yet
                    return self.next();
                }
            }
        }
    }
}

module.exports = LessonController;