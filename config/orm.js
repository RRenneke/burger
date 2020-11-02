// import mysql connection
const connection = require("../config/connection.js");

// Helper function for SQL syntax
//Per TA we should pretty much copy and paste the printQuestionMarks and objToSql from project to project
function printQuestionMarks(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  const arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (let key in ob) {
    let value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Mushroom Swiss => 'Mushroom Swiss')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
  all: function(tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

//bring in the table, cols, vals, and call back function everything will tie back to
//only call back is a function
  create: function(table, cols, vals, cb) {
      //Dynamically instert Into statement
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    //use instead of the what goes in where statements
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  //bring in the table, object column values, condition, and call back function everying is going to trace back to
  update: function(table, objColVals, condition, cb) {
      //build out the query to update the table
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  //bring in the table, condition, and call back function everying is going to trace back to
  delete: function(table, condition, cb) {
    //build out the query to delete table
    var queryString = "DELETE FROM " + table;
    //where
    queryString += " WHERE ";
    //condition
    queryString += condition;

    //pass in the condition string
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      //then, call back the result. 
      cb(result);
      //the result shoud be an object of how many rows were changed
      //sends it back to the model call back fucntion in the res spot
      //which sends it back to the controller call back into the results spot.
      //If results affected rows equal zero there was no change
      //otherwise will make update/delete
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;
