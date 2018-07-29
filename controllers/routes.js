module.exports = function(app,db){
    app.get("/api/data",(req,res) => {
        res.send(JSON.stringify(db.get(x => true)));
    });

    app.get("/api/data/students",(req,res) => {
        res.send(JSON.stringify(db.get(x => x.type == "STUDENT")));
    });

    app.get("/api/data/courses",(req,res) => {
        res.send(JSON.stringify(db.get(x => x.type == "COURSE")));
    });

    app.get("/api/data/workshops",(req,res) => {
        res.send(JSON.stringify(db.get(x => x.type == "WORKSHOP")));
    });

    app.get("/api/data/sponsors",(req,res) => {
        res.send(JSON.stringify(db.get(x => x.type == "SPONSOR")));
    });

    app.get("/api/data/projects",(req,res) => {
        res.send(JSON.stringify(db.get(x => x.type == "PROJECT")));
    });
}