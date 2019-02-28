// method to load static file data in case of database not connecting
const path = require("path");
const fs = require("fs");


module.exports = function(params){
    // console.log("Fake Connection :: filename given as: ",filename);
    let { dataFileName } = params;
    params.dataFilePath = path.resolve(__dirname,"../public",dataFileName);
    // name = filename;
    return {
        model: function(name,schema){
            params.modelName = name;
            params.modelSchema = schema;
            return new FakeModel(params)
        }
    }
}

class FakeModel {
    constructor(params){
        let { debug, dataFilePath, modelName, schema } = params;
        this.dataFilePath = dataFilePath;
        this.modelName = modelName;
        this.schema = schema;
        this.debug = debug;
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

        if (this.debug){
            console.log(`\nFake Model\n create(): ${JSON.stringify(objectToCreate)}\n`);
        }

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
        if (this.debug){
            console.log(`\nFake Model\n find(): ${JSON.stringify(objectToFind)}\n`);
        }

        let data = this.loadData();

        if ((Object.keys(objectToFind)).length == 0){
            if (this.debug){
                console.log(`\nFake Model\n objectToFind has no properties, returning all data\n`)
            }
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
        if (this.debug){
            console.log(`\nFake Model\n update(): ${JSON.stringify(objectToUpdate)}, ${JSON.stringify(updatedObject)}\n`);
        }
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
        if (this.debug){
            console.log(`\nFake Model\n delete(): ${JSON.stringify(objectToDelete)}\n`);
        }
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
        if (this.debug){
            console.log(`\nFake Model\n loadData(): dataFilePath: ${this.dataFilePath}`);
        }
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