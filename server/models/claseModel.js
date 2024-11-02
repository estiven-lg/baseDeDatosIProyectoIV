const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

async function getAllClases() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT * FROM AGENCIA_VIAJES.CLASE`, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  getAllClases,

};
