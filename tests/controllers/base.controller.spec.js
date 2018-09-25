const should = require("chai").should();
const assert = require("chai").assert;
const expect = require("chai").expect;



/*

IMPORT:

const baseController = require("./../../controllers/base.controller");


*/

describe("base.controller",() => {

    describe("controller structure",() => {

        it("should be an object",() => {
            const baseController = require("./../../controllers/base.controller");

            baseController.should.be.an("object");
        });

        it("should have 'name' property", () => {
            const baseController = require("./../../controllers/base.controller");

            baseController.should.have.property("name");
        });

        it("name property should be equal to 'base.controller'",() => {
            const baseController = require("./../../controllers/base.controller");

            baseController.name.should.equal("base.controller");
        });

        it("should have 'run' property", () => {
            const baseController = require("./../../controllers/base.controller");

            baseController.should.have.property("run");
        });

        it("run property should be a function", () => {
            const baseController = require("./../../controllers/base.controller");

            baseController.run.should.be.a("function");
        });

        it("run function should eventually call a function of res", () => {
            const baseController = require("./../../controllers/base.controller");

            var hasFunctionBeenRun = false;

            let req = {
                body:null,
                method:null,
                path:null
            };

            let res = {
                render: function(template,data){
                    return hasFunctionBeenRun = true;
                },
                json: function(data){
                    return hasFunctionBeenRun = true;
                }
            }
            baseController.run(req,res,next);

            assert(hasFunctionBeenRun === true);
        })

        it("should have 'getContent' property", () => {
            const baseController = require("./../../controllers/base.controller");

            baseController.should.have.property("getContent");
        });

        it("getContent property should be a function ", () => {
            const baseController = require("./../../controllers/base.controller");

            baseController.getContent.should.be.a("function");
        });

        it("")
    })
})