const expect = require("chai").expect;
const should = require("chai").should();
const assert = require("chai").assert;

describe("Courses Model", () => {

    describe("Basics", () => {

        var cM;

        beforeEach(() => {
            cM = new (require("./../../models/courses.model"))();
        })

        it("should be an object", () => {

            cM.should.be.an("object");

        });

        it("should have inherited from BaseModel", () => {
            let BaseModel = require("./../../models/base.model");

            assert(cM instanceof BaseModel)
        });


    })


})