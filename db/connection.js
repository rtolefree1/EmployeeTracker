const mysql2 = require("mysql2");
//const { connection } = require(".");



// Connecting to my database
const connection = mysql2.createConnection({
    host: 'localhost',

    user: 'root',

    password: '',

    database: 'employeeTracker_db'
},

);

// check for error, else connection is successful
connection.connect(function (err){
    if(err) 
        throw err;
    console.log(`Connected to the employeeTracker_db database`)
});

// exporting of this connection 
module.exports = connection;