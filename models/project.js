class Project {
    constructor(){
        this.id;
        this.name;
        this.description;
        this.sponsors = [];
        this.participants = [];
    }

    getObject(){
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            sponsors: this.sponsors,
            participants: this.participants
        }
    }
}