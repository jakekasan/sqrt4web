const expect = require("chai").expect;
const should = require("chai").should();
const assert = require("chai").assert;

describe("Home Controller",() => {

    describe("Basics",() => {
        var hc;

        beforeEach(() => {
            hc = new (require("./../../controllers/home.controller"))();
        });

        it("should be an object", () => {
            hc.should.be.an("object");
        });

        it("should have a property 'name'", () => {
            hc.should.have.property("name");
        });

        it("name should be equal to 'Home Controller'", () => {
            hc.name.should.equal("Home Controller");
        });

        it("should have a property 'run'",() => {
            hc.should.have.property("run");
        });

        it("run should be a function", () => {
            hc.run.should.be.a("function");
        });

    })

    describe("Functionality", () => {

        var hc;

        beforeEach(() => {
            hc = new (require("./../../controllers/home.controller"))();
        });

        it("should have a checkLoggedStatus property",() => {
            hc.should.have.property("checkLoggedStatus");
        });

        it("checkLoggedStatus should be a function", () => {
            hc.checkLoggedStatus.should.be.a("function");
        });

        it("TEMPORARY - checkLoggedStatus should return true", () => {
            (hc.checkLoggedStatus()).should.equal(true);
        });

    })
})