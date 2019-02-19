const Express = require("express");
const app = Express();
var bodyParser = require("body-parser");
const routes = require("./routes");
const config = require("./config/index")();
const mongoose = require("mongoose");
const sqlite3 = require("sqlite3");
const cookieParser = require("cookie-parser");

// Controllers
const HomeController = require("./controllers/home.controller");
const CoursesController = require("./controllers/courses.controller");
const APIController = require("./controllers/api.controller");
const ProjectController = require("./controllers/projects.controller");
const LessonController = require("./controllers/lesson.controller");

// Models
const UsersModel = require("./models/users.model");

// Views
const BaseView = require("./views/base.view");

app.set("view engine","ejs");

app.use(Express.static("public"));

// body parser
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cookies
app.use(cookieParser());

//routes(app);

mongoose.connect(config.db.mongodb.address,(err,conn) => {
    var hc = new HomeController(true);
    var cc = new CoursesController(true);
    var api = new APIController(true);
    var pc = new ProjectController(true);
    var lc = new LessonController(true);

    function databaseMiddleware(req,res,next){
        req.mongo = conn;
        req.sqlite = new sqlite3.Database(":memory:",(err) => {
            if (err) {
                console.log(err);
            }
        })
        next();
    }

    function loggingMiddleware(req,res,next){
        console.log(`${new Date(Date.now())}: ${req.method} request to ${req.path} with body: ${(req.body != {}) ? JSON.stringify(req.body) : "Empty"}`);
        next();
    }

    app.use(loggingMiddleware);
    app.use(databaseMiddleware);

    // for testing

    app.all("/test/*",(req,res,next) => {
        let split = (req.path).split("/");
        let template = split.pop();
        res.render(template);
    });

    app.all("/",(req,res,next) => {
        // console.log("Req to '/'");
        // console.log(hc);
        hc.run(req,res,next);
    });

    app.all("/courses",(req,res,next) => {
        // console.log("Req to '/courses/'");
        cc.run(req,res,next);
    });

    app.all("/project",(req,res,next) => {
        pc.run(req,res,next);
    })
    // Lessons
    app.all("/lesson*",(req,res,next) => {
        lc.run(req,res,next);
    })

    app.all("/lesson/:id/:route*",(req,res,next) => {
        console.log(req.path);
        console.log(req.params);
        next();
    })

    app.all("/lesson/:id/quiz/:quizID*",(req,res,next) => {
        console.log(req.path);
        console.log(req.params);
        next();
    })

    app.all("/view/course",(req,res,next) => {
        console.log("Req to '/view/course");
        cc.run(req,res,next);
    });

    app.all("/api/*",(req,res,next) => {
        api.run(req,res,next);
    })

    app.use((req,res,next) => {
        console.log("404");
        return res.render("404");
    })

    app.listen(8080,() => {
        console.log("App is running");
        console.log("Config settings:\n");
        console.log(JSON.stringify(config,null,2));
    });
})


