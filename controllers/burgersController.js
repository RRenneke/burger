//The controller is serving the route.
//If is has to do with what the user is doing, or serving the front end, or going in the URL, 
//it goes in the controller. 

const express = require("express");
//use a specific part of express called Router 
//it allows us to write our route in a different spot and export them in
const router = express.Router();
// Import the model (burger.js) to use its database functions
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    //create object called hbsOject
    const hbsObject = {
    //it contains the burgers value that is holding the data
      burgers: data
    };
    console.log(hbsObject);
    //res render the object to the index page
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new value
    res.json({ id: result.insertId });
  });
});

//add colon id becuase that is the parameter we are seclecting
router.put("/api/burgers/:id", function(req, res) {
//grab out the condition id = req params id
  let condition = "id = " + req.params.id;
  //passing the conidtion (which is the "id = " + req.params.id;)
  //then a call back function which (function(result) { }) of what the
  //of what you are going to return back to the user on the front end 
  //i.e update the devoured value with what we got from the front end
  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//controller that receives the call from the font end js
router.delete("/api/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
