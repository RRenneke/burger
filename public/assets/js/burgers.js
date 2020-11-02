// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-devoured").on("click", function(event) {
      let id = $(this).data("id");
      let newDevoured = $(this).data("newdevoured");
  
      var newDevouredState = {
        devoured: newDevoured
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevouredState
      }).then(
        function() {
          console.log("changed sleep to", newDevoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        name: $("#burg").val().trim(),
        devoured: $("[name=devoured]:checked").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-burger").on("click", function(event) {
      //grab id fro the data
      var id = $(this).data("id");
  
      // Send the DELETE request.
      //make a basic API call to API Burgers plus ID
      $.ajax("/api/burgers/" + id, {
        //type delete
        type: "DELETE"
        //reload the page when the function is done
      }).then(
        function() {
          if(res === "Success"){
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
        else {
          console.log("Delete Failed")
        }
        }
      );
    });
  });
  