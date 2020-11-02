//the model file is what is going to set speficic functions

//Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const burger = {
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(res);
    });
  },

  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },

  //the condition is the ("id = " + req.params.id;) from the controller
  //the call back function, is the function in the coltroller js
  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
    //when function(res) throws back data, we are going to 
      //put that data into the callback cb(res) and send it back to the contorller
      //this is the call back function the orm requires to be asynchronous
      cb(res);
    });
  },

  delete: function(condition, cb) { 
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
