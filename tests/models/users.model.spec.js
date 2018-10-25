const expect = require("chai").expect;
const should = require("chai").should();
const assert = require("chai").assert;

const BaseModel = require("./../../models/base.model");

describe("Users Model", () => {

    describe("Basics", () => {

        var uM;

        beforeEach(() => {
            uM = new (require("./../../models/users.model"))();
        })

        it("should be an object",() => {
            uM.should.be.an("object");
        });

        it("should be an instance of Base model", () => {
            assert(uM instanceof BaseModel);
        })
    })
})