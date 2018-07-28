class Resource {
    constructor(){
        this.id;
        this.type;
        this.title;
        this.description;
        this.author;
        this.mediaID;
    }

    getObject(){
        return {
            id: this.id,
            type: this.type,
            title: this.title,
            description: this.description,
            author: this.author,
            mediaID:this.mediaID
        }
    }
}