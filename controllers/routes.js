module.exports = function(app,db){

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