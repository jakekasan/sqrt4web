// method to load static file data in case of database not connecting
const path = require("path");
const fs = require("fs");


module.exports = function(filename){
    // console.log("Fake Connection :: filename given as: ",filename);
    dataFilePath = path.resolve(__dirname,"../public",filename);
    // name = filename;
    return {
        model: function(name,schema){
            let params = {
                name,
                schema,
                dataFilePath
            }
            return new FakeModel(params)
        }
    }
}

class FakeModel {
    constructor(params){
        let { dataFilePath, modelName, schema } = params;
        this.dataFilePath = dataFilePath;
        this.modelName = modelName;
        this.schema = schema;
    }

    // save(callback){
    //     // check the file for number of existing objects
    //     let data = loadData();
    //     let id = data.length;
    //     this.object.id = id;

    //     data.push(this.object);

    //     return saveData(data,(err) => {
    //         return callback(err,data)
    //     })
    // }

    create(objectToCreate,callback){
        let data = this.loadData();
        let id = data.length;

        objectToCreate.id = id;

        data.push(objectToCreate);
        
        this.saveData(data,(err) => {
            return callback(err,objectToCreate)    
        });
    }

    find(objectToFind,callback){
        // find object

        let data = this.loadData();

        if ((Object.keys(objectToFind)).length == 0){
            return callback(null,data)
        }

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

    update(objectToUpdate,updatedObject,callback){
        
        let { id } = objectToUpdate;

        let data = this.loadData();

        data = data.map(item => {
            if (item.id = id){
                item = updatedObject;
                item.id = id;
            }
        })

        this.saveData(data,(err) => {
            updatedObject.id = id;

            return callback(err,updatedObject)
        });

        
    }

    delete(objectToDelete,callback){
        let { id } = objectToDelete;

        let data = loadData();

        data = data.filter(item => {
            return item.id != id
        })

        this.saveData(data,(err) => {
            return callback(err,null)
        });
    }
    
    loadData(){
        // console.log("Fake Connection :: Loading data from path:",dataFilePath);
        return JSON.parse(fs.readFileSync(this.dataFilePath, 'utf8'))
    }
    
    saveData(dataToSave,callback){
        fs.writeFile(this.dataFilePath,JSON.stringify(dataToSave),"utf8",(err) => {
            return callback(err)
        })
    }
}



// class FakeModel {
//     constructor(object){
//         this.object = object;
//     }

//     static get name(){
//         return name
//     }

//     save(callback){
//         // check the file for number of existing objects
//         let data = loadData();
//         let id = data.length;
//         this.object.id = id;

//         data.push(this.object);

//         return saveData(data,(err) => {
//             return callback(err,data)
//         })
//     }

//     static create(objectToCreate,callback){
//         let data = loadData();
//         let id = data.length;

//         objectToCreate.id = id;

//         data.push(objectToCreate);
        
//         saveData(data,(err) => {
//             return callback(err,objectToCreate)    
//         });
//     }

//     static find(objectToFind,callback){
//         // find object

//         let data = loadData();

//         if ((Object.keys(objectToFind)).length == 0){
//             return callback(null,data)
//         }

//         data = data.filter((dataItem) => {
//             let results = (Object.keys(objectToFind)).map(key => {
//                 if (objectToFind[key] && dataItem[key]){
//                     return objectToFind[key] == dataItem[key]
//                 }
//                 return false
//             });
//             return results.includes(true)
//         })

//         return callback(null,data)
//     }

//     static update(objectToUpdate,updatedObject,callback){
        
//         let { id } = objectToUpdate;

//         let data = loadData();

//         data = data.map(item => {
//             if (item.id = id){
//                 item = updatedObject;
//                 item.id = id;
//             }
//         })

//         saveData(data,(err) => {
//             updatedObject.id = id;

//             return callback(err,updatedObject)
//         });

        
//     }

//     static delete(objectToDelete,callback){
//         let { id } = objectToDelete;

//         let data = loadData();

//         data = data.filter(item => {
//             return item.id != id
//         })

//         saveData(data,(err) => {
//             return callback(err,null)
//         });
//     }
// }

// function loadData(){
//     // console.log("Fake Connection :: Loading data from path:",dataFilePath);
//     return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
// }

// function saveData(dataToSave,callback){
//     fs.writeFile(dataFilePath,JSON.stringify(dataToSave),"utf8",(err) => {
//         return callback(err)
//     })
// }