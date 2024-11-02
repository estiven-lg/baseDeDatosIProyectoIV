require('dotenv').config();
const oracledb = require('oracledb');


module.exports = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionString: process.env.DB_CONNECTION_STRING,
    poolMin: 5,
    poolMax: 10,
    poolIncrement: 1,
};

