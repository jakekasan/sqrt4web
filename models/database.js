student_names = ["Homer Simpson","Bart Simpson","Lisa Simpson","Marge Simpson","Maggie Simpson","Luke Skywalker","Darth Vader","Harvey Spectre","Louis Litt","Jack Sparrow","Han Solo"]
company_names = ["IBM","Intel","Prusa","Raspberry Pi"]
project_names = ["Design new engine","Build new type of rocket","Program a controller for a machine","Build autonomous car","Build self-flying drone","3D print new type of turbine"]
workshop_names = ["3D Printing Basics","3D Printing Advanced","Programming Basics","Programming Advanced","Programming Expert","Programming Servers","Programming Drones","Engineering with 3D printers"]
course_names = ["3D Printing","Programming","Design"]

class Database {
    constructor(){
        this.records = [];
    }

    search(func){
        return this.records.filter(x => func(x));
    }

    makeDatabase(){
        let count = this.records.length;
        // students
        for (let name of student_names) {
            this.records.push({
                id:count,
                name:name,
                address:"Springfield",
                projects:[]
            });
            count++;
        }

        // sponsors
        for (let name of company_names){
            this.records.push({
                id:count,
                name:name,
                address:"New York",
                projects:[]
            });
            count++;
        }

        // projects
        for (let name of project_names){
            let sponsors = [];
            for (let i = 0; i < Math.floor(Math.random()*company_names.length); i++){
                let choice = company_names.pop(Math.floor(Math.random()*company_names.length));
                sponsors.push(choice);
            }
            let participants = [];
            this.records.push({
                id:count,
                name:name,
                description:"A project done by students in cooperation with industry to solve a problem a company might have...",
                sponsors:sponsors,
                participants:participants
            });
            count++;

            // courses
        }
    }
}


