/*

    base controller from which other controllers will inherit

    TODO:
        add some sort off event logging

*/

const CoursesModel = require("./../models/courses.model");
const ProjectsModel = require("./../models/projects.model");
const LessonsModel = require("./../models/lessons.model");
const ProjectsService = require("./services/projects.service");
const CoursesService = require("./services/courses.service");
// const CoursesModel = require("./../models/courses.model");

const _ = require("underscore");

class BaseController {
    constructor(params){
        // name = "Base Controller",debug = false
        let { name,debug } = { ...params };
        this.name = name || "Unnamed Controller";
        this.debug = (debug != undefined) ? debug : false;
        this.models = setModels(params);
        this.services = setServices(params);
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

function setModels(params){

    let coursesModel = new CoursesModel(params);
    let projectsModel = new ProjectsModel(params);
    let lessonsModel = new LessonsModel(params);
    
    return { coursesModel, projectsModel, lessonsModel }
}

function setServices(params){

    let coursesService = new CoursesService(params);
    let projectsService = new ProjectsService(params);

    return { coursesService, projectsService }
}