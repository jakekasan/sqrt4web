const Express = require("express");
const app = Express();
const routes = require("./routes");
const config = require("./config/index")();
const mongoose = require("mongoose");

// Controllers
const HomeController = require("./controllers/home.controller");

// Models
const UsersModel = require("./models/users.model");

// Views
const BaseView = require("./views/base.view");

app.set("view engine","ejs");

app.use(Express.static("public"));

//routes(app);

mongoose.connect(config.db.mongodb.address,(err,conn) => {
    var hc = new HomeController(true);

    function databaseMiddleware(req,res,next){
        req.mongo = conn;
        next();
    }

    app.use(databaseMiddleware);

    app.all("/",(req,res,next) => {
        console.log("Req to '/'");
        // res.render("main");
        // return
        console.log(hc);
        hc.run(req,res,next);
    });

    app.listen(8080,() => {
        console.log("App is running");
        console.log("Config settings:\n");
        console.log(JSON.stringify(config,null,2));
    });
})


