// method to load static file data in case of database not connecting

var dataFilePath;

module.exports = {
    model: function(dataFilePath){
        dataFilePath = dataFilePath;
        return FakeModel
    }
}

class FakeModel {
    constructor(object){
        this.object = object;
    }

    save(callback){
        // check the file for number of existing objects
        let data = loadData();
        let id = data.length;
        this.object.id = id;

        data.push(this.object);

        return saveData(data,(err) => {
            return callback(err,data)
        })
    }

    static create(objectToCreate,callback){
        let data = loadData();
        let id = data.length;

        objectToCreate.id = id;

        data.push(objectToCreate);
        
        saveData(data,(err) => {
            return callback(err,objectToCreate)    
        });
    }

    static find(objectToFind,callback){
        // find object

        let data = loadData();

        let found = [];

        data = data.filter((dataItem) => {
            let results = (Object.keys(objectToFind)).map(key => {
                if (objectToFind[key] && dataItem[key]){
                    return objectToFind[key] == dataItem[key]
                }
                return false
            });
            return results.includes(true)
        })

        return callback(null,data)
    }

    static update(objectToUpdate,updatedObject,callback){
        
        let { id } = objectToUpdate;

        let data = loadData();

        data = data.map(item => {
            if (item.id = id){
                item = updatedObject;
                item.id = id;
            }
        })

        saveData(data,(err) => {
            updatedObject.id = id;

            return callback(err,updatedObject)
        });

        
    }

    static delete(objectToDelete,callback){
        let { id } = objectToDelete;

        let data = loadData();

        data = data.filter(item => {
            return item.id != id
        })

        saveData(data,(err) => {
            return callback(err,null)
        });
    }
}

function loadData(){
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
}

function saveData(dataToSave,callback){
    fs.writeFile(dataFilePath,JSON.stringify(dataToSave),"utf8",(err) => {
        return callback(err)
    })
}