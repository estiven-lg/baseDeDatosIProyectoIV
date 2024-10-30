const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Crear una nueva sucursal
async function createSucursal({ DIRECCION, TELEFONO }) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO AGENCIA_VIAJES.SUCURSAL (DIRECCION, TELEFONO)
         VALUES (:DIRECCION, :TELEFONO)`,
      { DIRECCION, TELEFONO },
      { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result;
  } catch (error) {
    console.error('Error al crear sucursal:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Obtener todas las sucursales
async function getAllSucursales() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT * FROM AGENCIA_VIAJES.SUCURSAL`, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return result.rows;
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Obtener una sucursal por su ID
async function getSucursalById(CODIGO_SUC) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM AGENCIA_VIAJES.SUCURSAL WHERE CODIGO_SUC = :CODIGO_SUC`,
      { CODIGO_SUC },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener la sucursal:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Actualizar una sucursal
async function updateSucursal(CODIGO_SUC, { DIRECCION, TELEFONO }) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `UPDATE AGENCIA_VIAJES.SUCURSAL
         SET DIRECCION = :DIRECCION, TELEFONO = :TELEFONO
         WHERE CODIGO_SUC = :CODIGO_SUC`,
      { DIRECCION, TELEFONO, CODIGO_SUC },
      { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result;
  } catch (error) {
    console.error('Error al actualizar sucursal:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Eliminar una sucursal
async function deleteSucursal(CODIGO_SUC) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `DELETE FROM AGENCIA_VIAJES.SUCURSAL WHERE CODIGO_SUC = :CODIGO_SUC`,
      { CODIGO_SUC },
      { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result;
  } catch (error) {
    console.error('Error al eliminar sucursal:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  createSucursal,
  getAllSucursales,
  getSucursalById,
  updateSucursal,
  deleteSucursal,
};
