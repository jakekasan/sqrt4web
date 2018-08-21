const fetch = require("node-fetch");

module.exports = function(app,db){

    app.get("/home",(req,res) => {
        res.render("home");
    });

    app.get("/view",(req,res) => {
        let url = new URL("http://localhost:8080/api/data");
        url.search = new URLSearchParams({
            id:req.query.id,
            single:true
        })
        //let rawData = db.getById(req.query.id);
        let rawData = fetch(url)
                            .then(data => data.json())
                            .then(data => {
                                let nonLists = ["id","name","type","description"];
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
    });

    app.get("/edit",(req,res) => {
        const rawData = db.getById(req.query.id);
        let url = new URL("http://localhost:8080/api/data");
        url.search = new URLSearchParams({
            id:req.query.id
        });
        fetch(url)
            .then(data => data.json())
            .then(data => {
                let iterables = Object
                                    .keys(data)
                                    .map(key => { return data[key] })
                                    .filter(item => { (item instanceof Array) });
                let nonIterables = Object
                                    .keys(data)
                                    .map(key => { return data[key] })
                                    .filter(item => { !(item instanceof Array) });
                let promises = iterables
                                .map(item => {
                                    // TO-DO: make new promise for each element in each item !!!
                                    console.log("Item in promises");
                                    console.log(item);
                                    let subPromises = item.map(subItem => {
                                        let subUrl = new URL("https://localhost:8080/api/data");
                                        subUrl.search = new URLSearchParams({
                                            id:subItem.id
                                        });
                                        return fetch(subUrl).then(data => data.json());
                                    });
                                    return Promise.all(subPromises).then(values => {
                                        console.log("Values in subPromise");
                                        console.log(values);
                                        return values
                                    });
                                });
                Promise.all(promises)
                                .then(values => {
                                    console.log("Values:");
                                    console.log(values);
                                    
                                    // make new object and render it
                                    finalObj = {};
                                    for (let value of values) {
                                        finalObj[value[0]["type"]] = value;
                                    }
                                    console.log("Replying to client");
                                    console.log(finalObj);
                                    //res.send("success!");
                                    res.render("edit",{data:finalObj})
                                })
                                .catch(e => console.log(e));
                
                
            });
        // for (let key in rawData){
        //     if (rawData.hasOwnProperty(key)){
        //         let idList = rawData[key];
        //         if (idList instanceof Array){
        //             let promises = idList.map(item => {
        //                 console.log("Item")
        //                 console.log(item);
        //                 let url = new URL("http://localhost:8080/api/data")
        //                 url.search = new URLSearchParams({
        //                     id:String(item)
        //                 });
        //                 return fetch(url).then(data => data.json());
        //             });
        //             Promise.all(promises).then(values => {
        //                 //console.log(`setting ${key} as ${JSON.stringify(values)}`)
        //                 rawData[key] = values;
        //             }).catch(e => { console.log(e) });
        //         }
        //     }
        // }
        // if (rawData == false){
        //     res.send("Not found!");
        // } else {
        //     console.log("/edit Data");
        //     console.log(rawData);
        //     res.render("edit",{data:rawData});
        // }
    });

    app.get("/search",(req,res) => {
        res.render("search");
    });

    app.get("/api/data/search",(req,res) => {
        const q = req.query["q"].split("+").map(x => x.toLowerCase());
        let result = JSON.stringify(db.getKeywords(q));
        res.send(result);
    });

    app.get("/api/data",(req,res) => {
        //console.log(req.query);
        let result = db.get(req.query);
        //console.log(result);
        res.send(JSON.stringify(result));
    });

    app.get("/api/data/id",(req,res) => {
        res.send(JSON.stringify(db.getById(req.query.id)));
    })

    
}