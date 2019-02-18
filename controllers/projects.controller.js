const BaseController = require("./base.controller");
const BaseView = require("./../views/base.view");
// const LessonsModel = require("./../models/lessons.model");
const path = require("path");
const fs = require("fs");

class ProjectsController extends BaseController {
    constructor(debug){
        super("Projects Controller");
        this.debug = debug;
        // this.coursesModel = new CoursesModel();
    }

    run(req,res,next){
        const self = this;
        self.req = req;
        self.res = res;
        self.next = next;

        let view = new BaseView("project",self.res);

        let dataPath = path.resolve(__dirname,"../public",'projects.json');
        console.log(dataPath);
        var projectData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        return view.render({
            project: projectData
        });
    }
}

const routes = {
    "/":{
        "GET":(self) => {
            
        },
        "POST":(self) => {
            // nothing yet
            self.next();
        }
    },
    "/view":{
        "GET":(self) => {
            // view actual course
        },
        "POST":(self) => {
            // dunno yet
            self.next();
        }
    }
}

const projectDataBlah = {
    "title":"Vylepši sluchátka",
    "description":"Tento projek tě provede celou šíří vývoje produktu. Cílem je v týmové spolupráci vylepšit stávající design sluchátek a vyrobit je. Obtížnost: jednoduchá až náročná, Trvání: 6h+, cena sluchátek: 300 Kč",

    "gallery":[
        "project_photo.jpeg"
    ],
    "partners":[
        {
            "logo":"prusaresearch_logo.png",
            "name":"<a target='_blank' href='https://www.prusa3d.cz/'>Prusa Research</a>"
        }
    ],
    "authors":[
        "Dominik Schreier"
    ],
    "resources":[
        {
            "name":"3D Printed Headphones",
            "url":"https://www.thingiverse.com/thing:2120892"
        },
        {
            "name":"Armadillo Headphones",
            "url":"https://www.thingiverse.com/thing:2901308"
        },
        {
            "name":"EQ-1 Headphones",
            "url":"https://www.thingiverse.com/thing:674179"
        }
    ],
    "steps":[
        "Ujmi se týmové role",
        "Výzkum na ergonomii, estetiku, váhu nebo akustiku",
        "Test konceptů a materiálů",
        "Třídění nápadů a první draft",
        "Výroba produktu"
    ]
};

module.exports = ProjectsController;