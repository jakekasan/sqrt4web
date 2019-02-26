/*

    base controller from which other controllers will inherit

    TODO:
        add some sort off event logging

*/


const _ = require("underscore");

class baseController {
    constructor(params){
        // name = "Base Controller",debug = false
        let { name,debug } = { ...params };
        this.name = name || "Home Controller";
        this.debug = (debug != undefined) ? debug : false;
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