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

    get(func){
        return this.records.filter(x => func(x));
    }

    getById(id){
        console.log("getById");
        let object = this.records.filter(x => {
            return (x["id"] == id)
        })[0];
        
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                console.log(`${key} : ${element} `);
            }
        }
        
        return object;
    }
}

module.exports = Database;
