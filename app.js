const Express = require("express");
const app = Express();
const routes = require("./routes");
const config = require("./config/index")();
const mongoose = require("mongoose");

app.set("view engine","ejs");

app.use(Express.static("public"));

//routes(app);

let mongo = mongoose.connect(config.db.mongodb.address)


app.listen(8080,() => {
    console.log("App is running");
    console.log("Config settings:\n");
    console.log(JSON.stringify(config,null,2));
});