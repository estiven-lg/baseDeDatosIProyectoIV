const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

async function getAllVuelos() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM AGENCIA_VIAJES.VUELO', [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return result.rows;
  } catch (error) {
    console.log(error);

    throw error;
  } finally {
    if (connection) await connection.close();
  }
}

async function getVueloById(numVuelo) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      'SELECT * FROM AGENCIA_VIAJES.VUELO WHERE NUM_VUELO = :numVuelo',
      [numVuelo]
    );
    return result.rows[0];
  } finally {
    if (connection) await connection.close();
  }
}

async function createVuelo(vuelo) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO AGENCIA_VIAJES.VUELO ( FECHA, ORIGEN, DESTINO, NUM_PLAZA_DISP) 
      VALUES ( TO_TIMESTAMP(:fecha,'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'), :origen, :destino, :numPlazaDisp)`,
      [vuelo.FECHA, vuelo.ORIGEN, vuelo.DESTINO, vuelo.NUM_PLAZA_DISP],
      { autoCommit: true }
    );
  } catch (error) {
    console.error('Error creating vuelos:', error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
}

async function updateVuelo(numVuelo, vuelo) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `UPDATE AGENCIA_VIAJES.VUELO 
      SET FECHA = TO_TIMESTAMP_TZ(:fecha,'YYYY-MM-DD"T"HH24:MI:SS.FF3 TZR'), ORIGEN = :origen, DESTINO = :destino, NUM_PLAZA_DISP = :numPlazaDisp 
      WHERE NUM_VUELO = :numVuelo`,
      [vuelo.FECHA, vuelo.ORIGEN, vuelo.DESTINO, vuelo.NUM_PLAZA_DISP, numVuelo],
      { autoCommit: true }
    );
  } catch (error) {
    console.error('Error updating vuelos:', error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
}

async function deleteVuelo(numVuelo) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `DELETE FROM AGENCIA_VIAJES.VUELO WHERE NUM_VUELO = :numVuelo`,
      [numVuelo],
      { autoCommit: true }
    );
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = {
  getAllVuelos,
  getVueloById,
  createVuelo,
  updateVuelo,
  deleteVuelo,
};
