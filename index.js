const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/dbConfig');

//create express server
const app = express();

//Init database connection
dbConnection();

//Public
app.use(express.static('public'));

// Body read and parse
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/payroll', require('./routes/payroll'));
// TODO  CRUD

// listen to requests on port 4000
app.listen(process.env.PORT, ()=>{

    console.log(`Server running on Port ${process.env.PORT}`);

});