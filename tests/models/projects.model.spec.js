const expect = require("chai").expect;
const should = require("chai").should();
const assert = require("chai").assert;

const BaseModel = require("./../../models/base.model");

describe("Projects Model", () => {

    describe("Basics", () => {
        var pM;
        beforeEach(() => {
            pM = new (require("./../../models/projects.model"))();
        });

        it("should be an object", () => {
            pM.should.be.an("object");
        });

        it("should inherit from Base Model", () => {
            assert(pM instanceof BaseModel);
        });

    })
})