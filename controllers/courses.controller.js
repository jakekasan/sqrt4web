const BaseController = require("./base.controller");
const BaseView = require("./../views/base.view");
const CoursesModel = require("./../models/courses.model");
const LessonsModel = require("./../models/lessons.model");
const CoursesService = require("./services/courses.service");
const ProjectsService = require("./services/projects.service");

var quiz_data = {
    "title":"Quiz Time!",
    "questions": [
        {
            "id":1,
            "text":"Jaká je standardní tryska pro tiskárnu Original Prusa i3 MK3?",
            "lessonID":1,
            "moduleID":1,
            "options":[
                {
                    "correct":false,
                    "text":"0.6 mm"
                },
                {
                    "correct":false,
                    "text":"0.25 mm"
                },
                {
                    "correct":false,
                    "text":"0.5 mm"
                },
                {
                    "correct":true,
                    "text":"0.4 mm"
                }
                
            ]
        },
        {
            "id":2,
            "text":"V jakém formátu je 3D model, který upravuješ ve Slic3ru?",
            "lessonID":1,
            "moduleID":2,
            "options":[
                {
                    "correct":false,
                    "text":".3ds"
                },
                {
                    "correct":false,
                    "text":".fbx"
                },
                {
                    "correct":true,
                    "text":".obj"
                },
                {
                    "correct":true,
                    "text":".stl"
                }
                
            ]
        },
        {
            "id":3,
            "text":"Která tlačítka stiskneš, aby se ti zobrazil náhled výtisku?",
            "lessonID":1,
            "moduleID":3,
            "options":[
                {
                    "correct":false,
                    "text":"Vrstvy a Náhled"
                },
                {
                    "correct":false,
                    "text":"Exportovat STL a Náhled"
                },
                {
                    "correct":false,
                    "text":"Exportovat G-kód a Náhled"
                },
                {
                    "correct":true,
                    "text":"Slicovat a Náhled"
                }
                
            ]
        },
        {
            "id":4,
            "text":"Dokáže Slic3r upravovat rozměry modelu v jednotlivých osách X, Y a Z?",
            "lessonID":1,
            "moduleID":3,
            "options":[
                {
                    "correct":false,
                    "text":"Ne, rozměry modelu lze upravovat pouze rovnoměrně."
                },
                {
                    "correct":false,
                    "text":"Slic3r nedokáže upravovat rozměry modelu."
                },
                {
                    "correct":false,
                    "text":"Ne, pouze v ose Z."
                },
                {
                    "correct":true,
                    "text":"Ano, model lze upravovat v rovnoměrně i v jednotlivých osách."
                }
                
            ]
        },
        {
            "id":5,
            "text":"Kdy se ti ve Slic3ru zobrazí informace o tisku?",
            "lessonID":1,
            "moduleID":3,
            "options":[
                {
                    "correct":false,
                    "text":"Informace o tisku se ve Sliceru nezobrazují"
                },
                {
                    "correct":false,
                    "text":"Po kliknutí pravým tlačítkem myši na model"
                },
                {
                    "correct":false,
                    "text":"Po stisknutí Slicovat"
                },
                {
                    "correct":true,
                    "text":"Po exportu G-kódu"
                }
                
            ]
        },
        {
            "id":6,
            "text":"V jakém formátu se exportuje soubor pro tisk? Co nesmí název souboru obsahovat?",
            "lessonID":1,
            "moduleID":3,
            "options":[
                {
                    "correct":false,
                    "text":".stl, mezery"
                },
                {
                    "correct":false,
                    "text":".stl, diakritiku"
                },
                {
                    "correct":false,
                    "text":".gcode, mezery"
                },
                {
                    "correct":true,
                    "text":".gcode, diakritiku"
                }
                
            ]
        },
        {
            "id":7,
            "text":"Jakých teplot dosahuje tryska tiskárny Original Prusa i3 MK3?",
            "lessonID":1,
            "moduleID":4,
            "options":[
                {
                    "correct":true,
                    "text":"Až 300 °C"
                },
                {
                    "correct":false,
                    "text":"Až 200 °C"
                },
                {
                    "correct":false,
                    "text":"Až 220 °C"
                },
                {
                    "correct":false,
                    "text":"Až 400 °C"
                }
                
            ]
        },
        {
            "id":8,
            "text":"Co je třeba udělat před zavedením filamentu do extruderu?",
            "lessonID":1,
            "moduleID":5,
            "options":[
                {
                    "correct":false,
                    "text":"Kalibrovat první vrstvu"
                },
                {
                    "correct":false,
                    "text":"Očistit trysku"
                },
                {
                    "correct":true,
                    "text":"Zastřihnout filament"
                },
                {
                    "correct":true,
                    "text":"Spustit předehřev"
                },
                
            ]
        },
        {
            "id":9,
            "text":"Jakou kalibraci vyžaduje sestavená tiskárna, která byla přepravována?",
            "lessonID":1,
            "moduleID":5,
            "options":[
                {
                    "correct":false,
                    "text":"Kalibrace první vrstvy"
                },
                {
                    "correct":false,
                    "text":"Kalibrace XYZ"
                },
                {
                    "correct":false,
                    "text":"PID kalibrace"
                },
                {
                    "correct":true,
                    "text":"Kalibrace v ose Z"
                },
                
            ]
        },
        {
            "id":10,
            "text":"Čím se zvýší přilnavost povrchu pružného tiskového plátu?",
            "lessonID":1,
            "moduleID":6,
            "options":[
                {
                    "correct":true,
                    "text":"Nanesením lepidla na tiskový plát."
                },
                {
                    "correct":true,
                    "text":"Očištěním plátu ubrouskem s alkoholem."
                },
                {
                    "correct":true,
                    "text":"Umytím plátu prostředkem na nádobí."
                },
                {
                    "correct":true,
                    "text":"Udržováním čistoty povrchu, zejména od mastnot."
                },
                
            ]
        },
        {
            "id":11,
            "text":"Jak vyladíš první vrstvu výtisku?",
            "lessonID":1,
            "moduleID":7,
            "options":[
                {
                    "correct":true,
                    "text":"V průběhu tisku první vrstvu upravím funkcí Doladění osy Z."
                },
                {
                    "correct":true,
                    "text":"Kalibrací první vrstvy podle Příručky 3D tiskaře."
                },
                {
                    "correct":false,
                    "text":"První vrstva se vyladí automaticky."
                },
                {
                    "correct":false,
                    "text":"Úpravou rychlostí tisku a teplot."
                },
                
            ]
        },
        {
            "id":12,
            "text":"Po dokončení tisku:",
            "lessonID":1,
            "moduleID":8,
            "options":[
                {
                    "correct":true,
                    "text":"Odeberu výtisk po zchladnutí trysky a tiskového plátu."
                },
                {
                    "correct":true,
                    "text":"Spálím se o trysku."
                },
                {
                    "correct":true,
                    "text":"Vyjmu filament."
                },
                {
                    "correct":true,
                    "text":"Provedu kalibraci."
                },
                
            ]
        }
    ]
};

class CoursesController extends BaseController {
    constructor(params){
        params.name = "Courses Controller"
        super({ ...params });
    }

    run(req,res,next){
        // if (this.debug) {
        //     console.log(`${(new Date(Date.now()))} : ${req.method} request to ${req.path} recieved`);
        // }
        
        var self = this; // for scope

        self.req = req;
        self.res = res;
        self.next = next;
        // self.mongo = self.req.mongo;
        self.coursesService = new CoursesService(false);
        self.projectsService = new ProjectsService(false);

        // console.log("Courses Controller");
        // console.log(this.paths["/courses"]["GET"])

        if (this.paths[self.req.path] && this.paths[self.req.path][self.req.method]){
            this.paths[self.req.path][self.req.method](self);
        } else {
            return next();
        }
    }

    browseCourses(self){
        self.coursesService.getAllCourses()
            .then((courses) => {
            let view = new BaseView("courses",self.res)
            console.log(courses);
            return view.render({
                courses: courses,
                breadcrumbs: [
                    {
                        name:"Home",
                        url:"/"
                    },
                    {
                        name:"Browse Courses",
                        url:"/courses"
                    }
                ]
            });
        });
    }

    singleCourse(self){
        // gets course by id

        let id = self.req.query.id;

        // replace with model lookup EVENTUALLY
        self.coursesService.getCourseByID(id)
            .then((course) => {
            
            let view = new BaseView("course",self.res);
    
            if (!course.projects){
                course.projects = [];
            }
            self.projectsService.getProjectByID(course.projects)
                .then(projects => {
                    console.log(projects);
                    course.projects = projects;
                    return view.render({
                        course:course,
                        breadcrumbs:[
                            {
                                name:"Home",
                                url:"/"
                            },
                            {
                                name:"Browse Courses",
                                url:"/courses"
                            },
                            {
                                name:course.name,
                                type:"Course",
                                url:`/courses?id=${course.id}`
                            }
                        ]
                    })
                });
        });

        
    }

    get paths(){
        return {
            "/courses":{
                "GET":(self) => {
                    if (self.req.query && self.req.query.id){
                        return this.singleCourse(self);
                    } else {
                        return this.browseCourses(self);
                    }
                },
                "POST":(self) => {
                    // process POST
                    // console.log(self.req.body);
                    // self.res.redirect("/courses");

                    let selectedID = self.req.body.id;
                    let selectedModules = self.req.body.modules;

                    if (self.req.body.modules instanceof Array){
                        selectedModules = selectedModules.map(item => {
                            return parseInt(item);
                        });
                    } else {
                        if (self.req.body.modules instanceof Number){
                            selectedModules = [parseInt(selectedModules)];
                        } else {
                            let generator = function* (){
                                let i = 0
                                while (true){
                                    yield i
                                    i++
                                }
                            }
                            let gen = generator();
                            selectedModules = Array(100).fill(0).map(() => { return gen.next().value });
                        }
                    }

                    self.coursesModel.getData((data,err) => {
                        if (err){
                            return console.log(err);
                        }

                        let content = {};

                        content.course = data.filter(item => item.id == selectedID)[0];

                        content.course.modules = content.course.modules.filter(item => {
                            return selectedModules.includes(item.id)
                        })
    
                        let view = new BaseView("test2",self.res);
    
                        return view.render(content)
                    });
                }
            },
            "/courses/quiz":{
                "GET":(self) => {
                    let view = new BaseView("quiz",self.res);
    
                    return view.render()
                },
                "POST":(self) => {
                    // let view = new BaseView("quiz",self.res);

                    let answers = self.req.body;

                    let points = (Object.keys(answers)).map(key => {
                        let answer = answers[key];
                        let correct = quiz_data["questions"].filter(item => item.id == key).pop()
                        let questionPoints = answer.map(item => {
                            let correctAnswer = correct["options"].filter(correctItem => {
                                return correctItem.text == item.text
                            }).pop()

                            if (correctAnswer.correct && item.selected){
                                return 1
                            } else {
                                return 0
                            }
                        })

                        console.log("Q points");
                        console.log(questionPoints);

                        return questionPoints.reduce((acc,ele) => {
                            return acc + ele
                        },0)
                    })
                        .reduce((acc,ele) => {
                            return acc+ele
                        },0)

                    // quiz_data.questions.map(item => {
                    //     console.log("OPTIONS");
                    //     console.log(item.options);
                    // })

                    let maxPossible = (quiz_data["questions"]).reduce((total,question) => {
                        return total + (question["options"]).reduce((acc,ele) => {
                            if (ele.correct){
                                return acc + 1
                            } else {
                                return acc
                            }
                        },0)
                    },0)

                    let score = points / maxPossible;

                    console.log(`${points} / ${maxPossible}`);

                    console.log("Score is ",score);

                    self.res.send(`Score = ${score}`);
    
                    // return view.render()
                }
            }
        }
    }


}

module.exports = CoursesController;