const Express = require("express");
const app = Express();
const routes = require("./routes");

app.set("view engine","ejs");

app.use(Express.static("public"));

routes(app);

app.listen(8080,() => {
    console.log("App is running");
});