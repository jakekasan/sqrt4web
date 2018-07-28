class Course {
    constructor(){
        this.id;
        this.title;
        this.authors = [];
        this.workshops = [];
    }

    getObject(){
        return {
            id: this.id,
            title: this.title,
            authors: this.authors,
            workshops = this.workshops
        }
    }
}