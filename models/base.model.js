class BaseModel {
    constructor(params){
        let { model } = params; 
        this.model = model;
    }

    create(objectToCreate,callback){
        // create object
        this.model.create(objectToCreate,(error,data) => callback(error,data));
    }

    retrieve(objectToRetrieve,callback){
        // retrieve object
        this.model.find(objectToRetrieve,(error,data) => callback(error,data));
    }

    update(objectToUpdate,updatedObject,callback){
        // update object
        this.model.update(objectToUpdate,updatedObject,callback);
    }

    delete(objectToDelete,callback){
        // delete object
        this.model.delete(objectToDelete,callback);
    }
}

module.exports = BaseModel;