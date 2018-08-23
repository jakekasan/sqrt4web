const fetch = require("node-fetch");

module.exports = function(app,db){

    app.get("/home",(req,res) => {
        res.render("home");
    });

    app.get("/home/teacher",(req,res) => {
        // for now, lets load the first educator
        let teacher;
        if (req.query.id){
            teacher = db.get({id:req.query.id});
        } else if (req.query.name) {
            teacher = db.get({name:req.query.name});
        } else {
            teacher = db.get({type:"EDUCATOR"});
        }
        
        // get courses that teacher is associated with
        teacher.courses = db.getFn((item) => {
            if (Object.keys(item).includes("authors")){
                return item["authors"].includes(teacher.id);
            } else {
                return false
            }
        });

        console.log(teacher.courses);

        let coursePromises = teacher.courses.map(item => {
            let promises = item.workshops.map(workshop => {
                if (workshop instanceof Object){
                    return new Promise((resolve,reject) => {
                        resolve(workshop);
                    })
                }
                let url = new URL("http://localhost:8080/api/data");
                url.search = new URLSearchParams({
                    id:String(workshop)
                });
                return fetch(url)
                            .then(data => data.json())
                            .catch(e => {
                                console.log(e);
                                return {
                                    id:"none",
                                    name:"error",
                                    description:"failed to load the data"
                                }
                            })
            });
            return Promise.all(promises)
                            .then(values => {
                                item.workshops = values;
                                return item
                            })
                            .catch(e => console.log(e));
        });

        Promise.all(coursePromises)
                .then(values => {
                    teacher.courses = values;
                    res.render("teacher-dash",{teacher:teacher});            
                });
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
        console.log(`Fetching /edit for id ${req.query.id}`)
        url.search = new URLSearchParams({
            id:req.query.id
        });
        fetch(url)
            .then(data => data.json())
            .then(data => {
                let iterables = Object
                                    .keys(data)
                                    .map(key => { return data[key] })
                                    .filter(item => { return (item instanceof Array) });
                let nonIterables = Object
                                    .keys(data)
                                    .map(key => {
                                        let obj = {};
                                        obj[key.toUpperCase()] = data[key];
                                        return obj
                                    })
                                    .filter(item => { return !(Object.values(item)[0] instanceof Array) });
                
                let promises = iterables
                                .filter(item => { return (item.length > 0) })
                                .map(item => {
                                    // TO-DO: make new promise for each element in each item !!!
                                    //console.log("Making promises for array",item);
                                    let subPromises = item.map(subItem => {
                                        //console.log(`Fetching info for id ${subItem}`);
                                        let subUrl = new URL("http://localhost:8080/api/data");
                                        subUrl.search = new URLSearchParams({
                                            id:subItem
                                        });
                                        return fetch(subUrl).then(data => data.json());
                                    });
                                    return Promise.all(subPromises)
                                });
                Promise.all(promises)
                                .then(values => {
                                    // make new object and render it
                                    finalObj = {};

                                    for (let value of nonIterables){
                                        finalObj[Object.keys(value)] = Object.values(value)[0];
                                    }

                                    for (let value of values) {
                                        finalObj[value[0]["type"]] = value;
                                    }
    
                                    res.render("edit",{data:finalObj})
                                })
                                .catch(e => {
                                    console.log("Caught error in the last Promise.all()");
                                    console.log(e);
                                });
            });
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
        if (result){
            res.send(JSON.stringify(result));
        } else {
            res.send("");
        }
    });

    app.get("/api/data/id",(req,res) => {
        res.send(JSON.stringify(db.getById(req.query.id)));
    });

    app.get("/api/data/fn",(req,res) => {
        let result = db.getFn(req.params.fn);
        res.send(result);
    });

    
}