const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

async function getAllHotels() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT * FROM AGENCIA_VIAJES.HOTEL`, [], {
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

async function getHotelById(codigoHotel) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM AGENCIA_VIAJES.HOTEL WHERE CODIGO_HOTEL = :codigoHotel`,
      [codigoHotel]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function createHotel(hotelData) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO AGENCIA_VIAJES.HOTEL (CODIGO_HOTEL, NOMBRE, DIRECCION, CUIDAD, TELEFONO, NUM_PLAZAS_DISP) 
       VALUES (:codigoHotel, :nombre, :direccion, :ciudad, :telefono, :numPlazasDisp)`,
      {
        codigoHotel: hotelData.CODIGO_HOTEL,
        nombre: hotelData.NOMBRE,
        direccion: hotelData.DIRECCION,
        ciudad: hotelData.CIUDAD,
        telefono: hotelData.TELEFONO,
        numPlazasDisp: hotelData.NUM_PLAZAS_DISP,
      },
      { autoCommit: true }
    );
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function updateHotel(hotelData) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `UPDATE AGENCIA_VIAJES.HOTEL SET 
        NOMBRE = :nombre, 
        DIRECCION = :direccion, 
        CUIDAD = :ciudad, 
        TELEFONO = :telefono, 
        NUM_PLAZAS_DISP = :numPlazasDisp 
       WHERE CODIGO_HOTEL = :codigoHotel`,
      {
        nombre: hotelData.NOMBRE,
        direccion: hotelData.DIRECCION,
        ciudad: hotelData.CIUDAD,
        telefono: hotelData.TELEFONO,
        numPlazasDisp: hotelData.NUM_PLAZAS_DISP,
        codigoHotel: hotelData.CODIGO_HOTEL,
      },
      { autoCommit: true }
    );
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function deleteHotel(codigoHotel) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `DELETE FROM AGENCIA_VIAJES.HOTEL WHERE CODIGO_HOTEL = :codigoHotel`,
      [codigoHotel],
      { autoCommit: true }
    );
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
};
