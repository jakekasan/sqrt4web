const ProjectsModel = require("./../../models/projects.model");


module.exports = class ProjectsService {
    constructor(connection){
        this.projectsModel = new ProjectsModel(connection);
    }

    getProjectByID(id){
        // can either return one project or an array
        if (id instanceof Array){
            let promises = id.map(item => this.getProjectByID(item));

            return Promise.all(promises)
        }
        return new Promise((resolve,reject) => {
            this.projectsModel.findOne({id:id},(data,err) => {
                if (err){
                    return reject(err);
                }
                return resolve(data);
            })
        })
    }

    getAllProjects(){
        return new Promise((resolve,reject) => {
            this.projectsModel.findAll({},(data,err) => {
                if (err) {
                    return reject(err)
                }
                return resolve(data)
            })
        })
    }
}