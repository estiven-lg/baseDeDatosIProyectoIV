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
      `INSERT INTO AGENCIA_VIAJES.VUELO (NUM_VUELO, FECHA, ORIGEN, DESTINO, NUM_PLAZA_DISP) 
      VALUES (:numVuelo, :fecha, :origen, :destino, :numPlazaDisp)`,
      [vuelo.numVuelo, vuelo.fecha, vuelo.origen, vuelo.destino, vuelo.numPlazaDisp],
      { autoCommit: true }
    );
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
      SET FECHA = :fecha, ORIGEN = :origen, DESTINO = :destino, NUM_PLAZA_DISP = :numPlazaDisp 
      WHERE NUM_VUELO = :numVuelo`,
      [vuelo.fecha, vuelo.origen, vuelo.destino, vuelo.numPlazaDisp, numVuelo],
      { autoCommit: true }
    );
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
