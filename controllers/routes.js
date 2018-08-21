module.exports = function(app,db){

    app.get("/home",(req,res) => {
        res.render("home");
    });

    app.get("/view",(req,res) => {
        let rawData = db.getById(req.query.id);
        let nonLists = ["id","name","type","description"];
        console.log(rawData);
        processedData = {};
        for (let key in rawData){
            if (rawData.hasOwnProperty(key)){
                if (nonLists.includes(key)){
                    processedData[key] = rawData[key];
                } else {
                    processedData[key] = rawData[key].map(elem => {
                        return db.getById(elem);
                    });
                }
            }
        }
        res.render("view",{data: processedData});
    });

    app.get("/edit",(req,res) => {
        let rawData = db.getById(req.query.id);
        if (rawData == false){
            res.send("Not found!");
        } else {
            res.render("edit",{data:rawData});
        }
    });

    app.get("/search",(req,res) => {
        res.render("search");
    });

    app.get("/api/data/search",(req,res) => {
        console.log(req.query);
        const q = req.query["q"].split("+").map(x => x.toLowerCase());
        console.log(q);

        let result = JSON.stringify(db.getKeywords(q));
        
        res.send(result);
    });

    app.get("/api/data",(req,res) => {
        console.log(req.query);
        res.send(JSON.stringify(db.get(req.query)))
    });
}