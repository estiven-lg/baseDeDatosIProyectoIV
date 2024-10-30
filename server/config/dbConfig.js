require('dotenv').config();
const oracledb = require('oracledb');


module.exports = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionString: "192.168.0.22:1521/XE",
    poolMin: 5,
    poolMax: 10,
    poolIncrement: 1,
};

