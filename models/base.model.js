class BaseModel {
    constructor(model){
        // set schemas?
        this.model = model;
    }

    create(objectToCreate,callback){
        /*
        * 
        *
        */

        this.model.create(objectToCreate,(error,data) => callback(error,data))
        callback(null,null)
    }

    retrieve(objectToCreate,callback){
        // create object
        this.model.find(objectToRetrieve,(error,data) => callback(error,data));
    }

    update(objectToUpdate,updatedObject,callback){
        // create object
        callback(null,null)
    }

    delete(objectToDelete,callback){
        // create object
        callback(null,null)
    }
}

module.exports = BaseModel;