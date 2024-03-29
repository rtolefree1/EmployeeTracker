// Importing express and creating variable
const express = require('express');

// Importing mysql and creating variable
const mysql = require('mysql2');

// Middleware is created for parsing incoming request
const PORT = process.env.PORT || 3001;
const app = express();


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

