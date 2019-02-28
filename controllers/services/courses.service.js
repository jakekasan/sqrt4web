const ProjectsModel = require("./../../models/projects.model");
const LessonsModel = require("./../../models/lessons.model");
const CoursesModel = require("./../../models/courses.model");


// const ProjectsService = require("./projects.service");

module.exports = class CoursesService {
    constructor(params){
        let { debug } = params;
        this.lessonsModel = new LessonsModel(params);
        this.projectsModel = new ProjectsModel(params);
        this.coursesModel = new CoursesModel(params);
        this.debug = debug;
    }

    getOneLesson(query) {
        return new Promise((resolve,reject) => {
            this.lessonsModel.findOne({...query},(data,err) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            })
        })
    }

    getLessons(query) {
        return new Promise((resolve,reject) => {
            this.lessonsModel.getData((data,err) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            })
        })
    }

    getLessonsForCourse (course) {
        // console.log(course);
        if (!course.lessons){
            course.lessons = [];
        }
        let lessonIDs = course.lessons;
        if (!lessonIDs) { console.log(course) };
        let promises = lessonIDs.map(item => {
            return this.getOneLesson({id:item})
        })
        return Promise.all(promises)
            .then(data => {
                course.lessons = data;
                return course
            })
    }

    getCourse(query){
        console.log(`getCourseByID : id = ${query}`);
        return new Promise((resolve,reject) => {
            this.coursesModel.findOne({...query},(course,error) => {
                if (error) {
                    return reject(error)
                }
                this.getLessonsForCourse(course)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        })
    }

    getAllCourses(){
        return new Promise((resolve,reject) => {
            this.coursesModel.getData((courses,error) => {
                if (error) {
                    return reject(error)
                }
                let coursePromises = courses.map(course => this.getLessonsForCourse(course));
                Promise.all(coursePromises)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        })
    }

    
}
