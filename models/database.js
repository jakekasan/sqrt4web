// student_names = ["Homer Simpson","Bart Simpson","Lisa Simpson","Marge Simpson","Maggie Simpson","Luke Skywalker","Darth Vader","Harvey Spectre","Louis Litt","Jack Sparrow","Han Solo"]
// company_names = ["IBM","Intel","Prusa","Raspberry Pi"]
// project_names = ["Design new engine","Build new type of rocket","Program a controller for a machine","Build autonomous car","Build self-flying drone","3D print new type of turbine"]
// workshop_names = ["3D Printing Basics","3D Printing Advanced","Programming Basics","Programming Advanced","Programming Expert","Programming Servers","Programming Drones","Engineering with 3D printers"]
// course_names = ["3D Printing","Programming","Design"]

const fake_data = require("./fake_data.js");

class Database {
    constructor(){
        this.records = fake_data;
    }

    get(parameters){
        let results = this.records.filter(record => {
            for (let parameter in parameters){
                if ((record.hasOwnProperty(parameter)) && (parameter != "single")){
                    if (record[parameter] != parameters[parameter]){
                        return false
                    }
                } else {
                    return false
                }
            }
            return true
        });
        if (Object.keys(parameters).includes("single")){
            if (parameters.single == false){
                return results
            }
        }
        return results[0]
    }

    getFn(fn){
        return this.records.filter(item => fn(item));
    }

    // old get function, where the query item could be any parameter
    getKeywords(qs){
        let results = [];

        for (let obj of this.records){
            for (let parameter in obj){
                if (obj.hasOwnProperty(parameter)){
                    for (let q of qs){
                        if ((new RegExp(String(q).toLowerCase())).exec(String(obj[parameter]).toLowerCase())){
                            // we have a match!
                            results.push(obj);
                        }
                    }
                }
            }
        }

        // now filter these results to avoid duplicates
        results = results.reduce((acc,elem) => {
            for (let item of acc){
                if (item.id == elem.id){
                    return acc;
                }
            }
            acc.push(elem);
            return acc;
        },[]);
        return results
    }

    // old get
    // get(func){
    //     return this.records.filter(x => func(x));
    // }

    getById(id){
        //console.log("getById");
        let object = this.records.filter(x => {
            return (x["id"] == id)
        })[0];
        
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                //console.log(`${key} : ${element} `);
            }
        }
        if (object == undefined){
            return false
        }
        return object
    }
}

module.exports = Database;

