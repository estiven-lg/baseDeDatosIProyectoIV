const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Crear una nueva relación entre turista y vuelo
async function createTuristaVuelo({ TURISTA, VUELO, CLASE }) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO AGENCIA_VIAJES.TURISTA_VUELO (TURISTA, VUELO, CLASE)
       VALUES (:TURISTA, :VUELO, :CLASE)`,
      { TURISTA, VUELO, CLASE },
      { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result;
  } catch (error) {
    console.error('Error al crear la relación turista-vuelo:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Obtener todas las relaciones de turista-vuelo
async function getAllTuristaVuelos() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `
      SELECT 
        tv.TURISTA,
        tv.VUELO,
        v.ORIGEN,
        v.DESTINO,
        tv.CLASE,
        c.NOM_CLASE
        FROM 
            AGENCIA_VIAJES.TURISTA_VUELO tv
        JOIN 
            AGENCIA_VIAJES.VUELO v ON tv.VUELO = v.NUM_VUELO
        JOIN 
            AGENCIA_VIAJES.CLASE c ON tv.CLASE = c.ID_CLASE
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } catch (error) {
    console.error('Error al obtener las relaciones turista-vuelo:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Obtener una relación específica por TURISTA y VUELO
async function getTuristaVueloById(TURISTA, VUELO) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM AGENCIA_VIAJES.TURISTA_VUELO WHERE TURISTA = :TURISTA AND VUELO = :VUELO`,
      { TURISTA, VUELO },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener la relación turista-vuelo:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Obtener una relación específica por  VUELO
async function getTuristaVueloByIdTurista(TURISTA) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `
      SELECT 
        tv.TURISTA,
        tv.VUELO,
        v.ORIGEN,
        v.DESTINO,
        tv.CLASE,
        c.NOM_CLASE
        FROM 
            AGENCIA_VIAJES.TURISTA_VUELO tv
        JOIN 
            AGENCIA_VIAJES.VUELO v ON tv.VUELO = v.NUM_VUELO
        JOIN 
            AGENCIA_VIAJES.CLASE c ON tv.CLASE = c.ID_CLASE
         WHERE TURISTA = :TURISTA
         `,
      { TURISTA },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } catch (error) {
    console.error('Error al obtener la relación turista-vuelo:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}


// Eliminar una relación entre turista y vuelo
async function deleteTuristaVuelo(TURISTA, VUELO) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `DELETE FROM AGENCIA_VIAJES.TURISTA_VUELO WHERE TURISTA = :TURISTA AND VUELO = :VUELO`,
      { TURISTA, VUELO },
      { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result;
  } catch (error) {
    console.error('Error al eliminar la relación turista-vuelo:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  createTuristaVuelo,
  getAllTuristaVuelos,
  getTuristaVueloById,
  deleteTuristaVuelo,
  getTuristaVueloByIdTurista,
};
