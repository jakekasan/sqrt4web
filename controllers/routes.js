module.exports = function(app,db){
    app.get("/api/data",(req,res) => {
        res.send(JSON.stringify(db.get(x => true)));
    });

    app.get("/api/data/search",(req,res) => {
        console.log(req.query);
        const q = req.query["q"].split("+").map(x => x.toLowerCase());
        console.log(q);
        console.log(db.get(object => {
            for (let key in object) {
                if (object.hasOwnProperty(key)) {
                    let val = object[key];
                    if (true){
                        val = new String(val);
                        val = val.toLowerCase();

                        console.log(`The q is ${q}`);
                        
                        for (let param of q){
                            console.log(`${param} == ${val}`);
                            if ((new RegExp(param)).exec(val)){
                                console.log("Value found!");
                                return true;
                            }
                        }    
                    }
                }
            }
            return false;
        }));
        res.send(req.query);
    })

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