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
        this.models = setModels(params.mongo);
        this.services = setServices(params.mongo);
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

function setServices(mongo){

    if (mongo == undefined){
        mongo = false;
    }

    let coursesService = new CoursesService(mongo);
    let projectsService = new ProjectsService(mongo);

    return { coursesService, projectsService }
}