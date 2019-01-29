const Express = require("express");
const app = Express();
const routes = require("./routes");
const config = require("./config/index")();
const mongoose = require("mongoose");

// Controllers
const HomeController = require("./controllers/home.controller");
const CoursesController = require("./controllers/courses.controller");
const APIController = require("./controllers/api.controller");

// Models
const UsersModel = require("./models/users.model");

// Views
const BaseView = require("./views/base.view");

app.set("view engine","ejs");

app.use(Express.static("public"));

//routes(app);

mongoose.connect(config.db.mongodb.address,(err,conn) => {
    var hc = new HomeController(true);
    var cc = new CoursesController(true);
    var api = new APIController(true);

    function databaseMiddleware(req,res,next){
        req.mongo = conn;
        next();
    }

    app.use(databaseMiddleware);

    // for testing

    app.all("/test",(req,res,next) => {
        res.render("test");
    })

    app.all("/",(req,res,next) => {
        console.log("Req to '/'");
        console.log(hc);
        hc.run(req,res,next);
    });

    app.all("/courses/",(req,res,next) => {
        console.log("Req to '/courses/'");
        cc.run(req,res,next);
    });

    app.all("/view/course",(req,res,next) => {
        console.log("Req to '/view/course");
        cc.run(req,res,next);
    });

    app.all("/api/*",(req,res,next) => {
        api.run(req,res,next);
    })

    app.use((req,res,next) => {
        console.log("404");
        return res.send("404 Dude...");
    })

    app.listen(8080,() => {
        console.log("App is running");
        console.log("Config settings:\n");
        console.log(JSON.stringify(config,null,2));
    });
})


