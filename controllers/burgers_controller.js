var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      //burgers: data
      //make 2 arrays and filter through array filter
      // eaten: array of devoured burgers
      // noneaten: array of nondevoured burgers
      eaten: data.filter(function(burger){
        if(!burger.seed)
        {
          return burger.devoured;
        }

      }),
      noneaten: data.filter(function(burger){
        return !burger.devoured;
      })
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {

  //display field
  //document.getElementById("added_burger").className += " display_yes";

  burger.insertOne([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("here!!! condition", condition);

  //display field
  //document.getElementById("updated_burger").className += " display_yes";

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.deleteOne(condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
