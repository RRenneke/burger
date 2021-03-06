// require mysql
const mysql = require("mysql");

//now with mysql we create a connection
if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else{
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
  password: "rootpasswordSMU",
  database: "burger_db"
  });
  };

// Make connection
//the connect function takes a call back function
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  //if no error, it will console log the id
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;