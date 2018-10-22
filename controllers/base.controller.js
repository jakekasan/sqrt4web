/*

    base controller from which other controllers will inherit

    TODO:
        add some sort off event logging

*/


const _ = require("underscore");

module.exports = function(){
    return
}

module.exports.prototype = {
    extends: function(object){
        return _.extend({},this,object)
    }
}
