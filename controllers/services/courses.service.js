const LessonsModel = require("./../../models/lessons.model");
const CoursesModel = require("./../../models/courses.model");

module.exports = class CoursesService {
    constructor(connection){
        this.lessonsModel = new LessonsModel(connection);
        this.coursesModel = new CoursesModel(connection);
    }

    getLessonByID (lessonID) {
        return new Promise((resolve,reject) => {
            this.lessonsModel.findOne({id:lessonID},(data,err) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            })
        })
    }

    getLessonsForCourse (course) {
        let lessonIDs = course.lessons;
        let promises = lessonIDs.map(item => {
            return this.getLessonByID(item)
        })
        return Promise.all(promises)
            .then(data => {
                course.lessons = data;
                return course
            })
    }

    getCourseByID(id){
        return new Promise((resolve,reject) => {
            this.coursesModel.findOne({id:id},(course,error) => {
                if (error) {
                    return reject(error)
                }
                this.getLessonsForCourse(course)
                    .then(data => {
                        resolve(data);
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
