student_names = ["Homer Simpson","Bart Simpson","Lisa Simpson","Marge Simpson","Maggie Simpson","Luke Skywalker","Darth Vader","Harvey Spectre","Louis Litt","Jack Sparrow","Han Solo"]
company_names = ["IBM","Intel","Prusa","Raspberry Pi"]

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
            let participants = [];
            this.records.push({
                id:count,
                name:name,
                description:"A project done by students in cooperation with industry to solve a problem a company might have...",
                sponsors:sponsors,
                participants:participants
            })
        }

    }
}


