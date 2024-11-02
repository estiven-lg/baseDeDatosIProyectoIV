const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Crear una nueva relación entre turista y hotel
async function createTuristaHotel({ TURISTA, HOTEL, REGIMEN_HOSP, FECHA_LLEGADA, FECHA_PARTIDA }) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO AGENCIA_VIAJES.TURISTA_HOTEL (TURISTA, HOTEL, REGIMEN_HOSP, FECHA_LLEGADA, FECHA_PARTIDA)
       VALUES (
       :TURISTA,
        :HOTEL, 
        :REGIMEN_HOSP,
         TO_TIMESTAMP_TZ(:FECHA_LLEGADA,'YYYY-MM-DD"T"HH24:MI:SS.FF3 TZR'),
         TO_TIMESTAMP_TZ(:FECHA_PARTIDA,'YYYY-MM-DD"T"HH24:MI:SS.FF3 TZR')
          )`,
      { TURISTA, HOTEL, REGIMEN_HOSP, FECHA_LLEGADA, FECHA_PARTIDA },
      { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result;
  } catch (error) {
    console.error('Error al crear la relación turista-hotel:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Obtener todas las relaciones de turista-hotel
async function getAllTuristaHotel() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `
      SELECT 
        th.TURISTA,
        th.HOTEL,
        h.NOMBRE AS NOMBRE_HOTEL,
        th.REGIMEN_HOSP,
        rh.NOM_REGIMEN AS REGIMEN_NOMBRE,
        th.FECHA_LLEGADA,
        th.FECHA_PARTIDA
      FROM 
          AGENCIA_VIAJES.TURISTA_HOTEL th
      JOIN 
          AGENCIA_VIAJES.HOTEL h ON th.HOTEL = h.CODIGO_HOTEL
      JOIN 
          AGENCIA_VIAJES.REGIMEN_HOSPEDAJE rh ON th.REGIMEN_HOSP = rh.ID_REGIMEN
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } catch (error) {
    console.error('Error al obtener las relaciones turista-hotel:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function getAllTuristaHotelByTurista(CODIGO_TURISTA) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `
      SELECT 
        th.TURISTA,
        th.HOTEL,
        h.NOMBRE AS NOMBRE_HOTEL,
        th.REGIMEN_HOSP,
        rh.NOM_REGIMEN AS REGIMEN_NOMBRE,
        th.FECHA_LLEGADA,
        th.FECHA_PARTIDA
      FROM 
          AGENCIA_VIAJES.TURISTA_HOTEL th
      JOIN 
          AGENCIA_VIAJES.HOTEL h ON th.HOTEL = h.CODIGO_HOTEL
      JOIN 
          AGENCIA_VIAJES.REGIMEN_HOSPEDAJE rh ON th.REGIMEN_HOSP = rh.ID_REGIMEN
        WHERE TURISTA = :CODIGO_TURISTA
      `,
      [CODIGO_TURISTA],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } catch (error) {
    console.error('Error al obtener las relaciones turista-hotel:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Obtener una relación específica por TURISTA y HOTEL
async function getTuristaHotelById(TURISTA, HOTEL) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM AGENCIA_VIAJES.TURISTA_HOTEL WHERE TURISTA = :TURISTA AND HOTEL = :HOTEL`,
      { TURISTA, HOTEL },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener la relación turista-hotel:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Eliminar una relación entre turista y hotel
async function deleteTuristaHotel(TURISTA, HOTEL) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `DELETE FROM AGENCIA_VIAJES.TURISTA_HOTEL WHERE TURISTA = :TURISTA AND HOTEL = :HOTEL`,
      { TURISTA, HOTEL },
      { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result;
  } catch (error) {
    console.error('Error al eliminar la relación turista-hotel:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  createTuristaHotel,
  getAllTuristaHotel,
  getTuristaHotelById,
  deleteTuristaHotel,
  getAllTuristaHotelByTurista,
};
