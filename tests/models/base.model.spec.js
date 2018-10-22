const expect = require("chai").expect;
const should = require("chai").should();
const assert = require("chai").assert;

describe("Base Model", () => {
    
    describe("Basic",() => {
        var bM;

        beforeEach(() => {
            bM = new (require("./../../models/base.model"))();
        });

        it("should be an object",() => {
            bM.should.be.an("object");
        });

        // create

        it("should have a create property",() => {
            bM.should.have.property("create");
        });

        it("create should be a function", () => {
            bM.create.should.be.a("function");
        });

        // retrieve

        it("should have a retrieve property",() => {
            bM.should.have.property("retrieve");
        });

        it("retrieve should be a function", () => {
            bM.retrieve.should.be.a("function");
        });

        // update

        it("should have an update property",() => {
            bM.should.have.property("update");
        });

        it("update should be a function", () => {
            bM.update.should.be.a("function");
        });

        // DELETE

        it("should have a delete property",() => {
            bM.should.have.property("delete");
        });

        it("delete should be a function", () => {
            bM.delete.should.be.a("function");
        });

        it("should have a model property",() => {
            bM.should.have.property("model");
        });
    })

})