const should = require("chai").should();
const assert = require("chai").assert;
const expect = require("chai").expect;



/*

IMPORT:

const baseController = require("./../../controllers/base.controller");


*/

describe("base.controller",() => {

    describe("structure",() => {
        var bc;

        beforeEach(() => {
            bc = new (require("./../../controllers/base.controller"))();
        });

        it("should be an object",() => {
            expect(bc).to.be.an("object");
        });

        it("should have attribute 'run'", () => {
            bc.should.have.property("run");
        });

        it("run property should be a function", () => {
            bc.run.should.be.a("function");
        });

        it("run should throw an error if req,res or next are missing", () => {
            assert.throw(bc.run);
        });
    })
})