const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/dbConfig');


//create express server
const app = express();

//Init database connection
dbConnection();

//CORS
//app.use(cors());

//Public
app.use(express.static('public'));

// Body read and parse
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payroll', require('./routes/payrollRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/deduction', require('./routes/deductionRoutes'));
app.use('/api/calculator', require('./routes/calculatorRoutes'));
// TODO  CRUD

// listen to requests on port 4000
app.listen(process.env.PORT, ()=>{

    console.log(`Server running on Port ${process.env.PORT}`);

});