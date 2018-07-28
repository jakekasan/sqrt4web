class Workshop {
    constructor(){
        this.id;
        this.title;
        this.students = [];
        this.resources = [];
        this.author = [];
    }

    getObject(){
        return {
            id: this.id,
            title: this.title,
            students: this.students,
            resources: this.resources,
            author: this.author
        }
    }
}