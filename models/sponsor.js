class Sponsor {
    constructor(){
        this.id;
        this.name;
        this.address;
        this.projects = [];
    }

    getObject(){
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            projects: this.projects
        }
    }
}