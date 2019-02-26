/*

    base controller from which other controllers will inherit

    TODO:
        add some sort off event logging

*/

const CoursesModel = require("./../models/courses.model");
const ProjectsModel = require("./../models/projects.model");
const LessonsModel = require("./../models/lessons.model");
// const CoursesModel = require("./../models/courses.model");

const _ = require("underscore");

class BaseController {
    constructor(params){
        // name = "Base Controller",debug = false
        let { name,debug } = { ...params };
        this.name = name || "Unnamed Controller";
        this.debug = (debug != undefined) ? debug : false;
        this.models = setModels(params.mongo);
    }

    run(req,res,next){
        if (this.debug) console.log(`Running 'run' from ${this.name}`)
        if (!req | !res | !next) {
            throw new Error("Parameters are wrong")
        }
        return next()
    }
}

module.exports = BaseController;

function setModels(mongo){
    if (mongo == undefined){
        mongo = false;
    }

    let coursesModel = new CoursesModel(mongo);
    let projectsModel = new ProjectsModel(mongo);
    let lessonsModel = new LessonsModel(mongo);
    
    return { coursesModel, projectsModel, lessonsModel }
}