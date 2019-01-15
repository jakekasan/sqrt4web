/*

    base controller from which other controllers will inherit

    TODO:
        add some sort off event logging

*/


const _ = require("underscore");

class baseController {
    constructor(name = "Base Controller",debug = false){
        this.name = name;
        this.debug = debug;
    }

    run(req,res,next){
        if (this.debug) console.log(`Running 'run' from ${this.name}`)
        if (!req | !res | !next) {
            throw new Error("Parameters are wrong")
        }
        return next()
    }
}

module.exports = baseController;