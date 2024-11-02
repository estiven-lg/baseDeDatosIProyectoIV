const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

async function getAllHospedajes() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT * FROM AGENCIA_VIAJES.REGIMEN_HOSPEDAJE `, [], {
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
  getAllHospedajes,

};
