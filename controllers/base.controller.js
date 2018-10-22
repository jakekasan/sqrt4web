/*

    base controller from which other controllers will inherit

    TODO:
        add some sort off event logging

*/


const _ = require("underscore");

class baseController {
    constructor(name){
        this.name = name;
    }

    run(req,res,next){
        if (!req | !res | !next) {
            throw new Error("Parameters are wrong")
        }
        return next()
    }
}

module.exports = baseController;