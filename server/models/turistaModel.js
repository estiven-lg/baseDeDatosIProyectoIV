const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

async function getTurista(CODIGO_TURISTA) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM TURISTA WHERE CODIGO_TURISTA = :CODIGO_TURISTA`,
      [CODIGO_TURISTA],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    if (connection) await connection.close();
  }
}

async function getTuristaContacts(CODIGO_TURISTA) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const phoneResult = await connection.execute(
      `SELECT NUM_TELEFONO FROM AGENCIA_VIAJES.TURISTA_TELEFONO WHERE CODIGO_TURISTA = :CODIGO_TURISTA`,
      [CODIGO_TURISTA]
    );
    const emailResult = await connection.execute(
      `SELECT CORREO FROM AGENCIA_VIAJES.TURISTA_CORREO WHERE CODIGO_TURISTA = :CODIGO_TURISTA`,
      [CODIGO_TURISTA]
    );
    return { TELEFONOS: phoneResult.rows[0], CORREOS: emailResult.rows[0] };
  } finally {
    if (connection) await connection.close();
  }
}

async function addTurista(turista) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO AGENCIA_VIAJES.TURISTA (CODIGO_TURISTA, SUC_CONTRATADA, NOMBRE1, NOMBRE2, NOMBRE3, APELLIDO1, APELLIDO2, PAIS) 
      VALUES (:codigo, :sucContratada, :nombre1, :nombre2, :nombre3, :apellido1, :apellido2, :pais)`,
      {
        codigo: turista.CODIGO_TURISTA,
        sucContratada: turista.SUC_CONTRATADA,
        nombre1: turista.NOMBRE1,
        nombre2: turista.NOMBRE2,
        nombre3: turista.NOMBRE3,
        apellido1: turista.APELLIDO1,
        apellido2: turista.APELLIDO2,
        pais: turista.PAIS,
      },
      { autoCommit: true }
    );
  } finally {
    if (connection) await connection.close();
  }
}

async function updateTurista(turista) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `UPDATE AGENCIA_VIAJES.TURISTA 
       SET SUC_CONTRATADA = :sucContratada, 
           NOMBRE1 = :nombre1, 
           NOMBRE2 = :nombre2, 
           NOMBRE3 = :nombre3, 
           APELLIDO1 = :apellido1, 
           APELLIDO2 = :apellido2, 
           PAIS = :pais 
       WHERE CODIGO_TURISTA = :codigo`,
      {
        sucContratada: turista.SUC_CONTRATADA,
        nombre1: turista.NOMBRE1,
        nombre2: turista.NOMBRE2,
        nombre3: turista.NOMBRE3,
        apellido1: turista.APELLIDO1,
        apellido2: turista.APELLIDO2,
        pais: turista.PAIS,
        codigo: turista.CODIGO_TURISTA,
      },
      { autoCommit: true }
    );
  } finally {
    if (connection) await connection.close();
  }
}

async function updateContacts(CODIGO_TURISTA, contacts) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute('BEGIN');

    // Proceso para teléfonos
    for (const phone of contacts.TELEFONOS) {
      if (phone._delete) {
        // Eliminar el teléfono si `_delete` está en true
        await connection.execute(
          `DELETE FROM AGENCIA_VIAJES.TURISTA_TELEFONO 
                     WHERE CODIGO_TURISTA = :CODIGO_TURISTA 
                     AND TELEFONO = :telefono`,
          { CODIGO_TURISTA, telefono: phone.value },
          { autoCommit: false }
        );
      } else {
        // Realizar un upsert para el teléfono
        await connection.execute(
          `MERGE INTO AGENCIA_VIAJES.TURISTA_TELEFONO t
                     USING (SELECT :CODIGO_TURISTA AS CODIGO_TURISTA, :telefono AS telefono FROM DUAL) s
                     ON (t.CODIGO_TURISTA = s.CODIGO_TURISTA AND t.TELEFONO = s.telefono)
                     WHEN NOT MATCHED THEN
                        INSERT (CODIGO_TURISTA, TELEFONO) VALUES (s.CODIGO_TURISTA, s.telefono)`,
          { CODIGO_TURISTA, telefono: phone.value },
          { autoCommit: false }
        );
      }
    }

    // Proceso para correos
    for (const email of contacts.CORREOS) {
      if (email._delete) {
        // Eliminar el correo si `_delete` está en true
        await connection.execute(
          `DELETE FROM AGENCIA_VIAJES.TURISTA_CORREO 
                     WHERE CODIGO_TURISTA = :CODIGO_TURISTA 
                     AND CORREO = :correo`,
          { CODIGO_TURISTA, correo: email.value },
          { autoCommit: false }
        );
      } else {
        // Realizar un upsert para el correo
        await connection.execute(
          `MERGE INTO AGENCIA_VIAJES.TURISTA_CORREO c
                     USING (SELECT :CODIGO_TURISTA AS CODIGO_TURISTA, :correo AS correo FROM DUAL) s
                     ON (c.CODIGO_TURISTA = s.CODIGO_TURISTA AND c.CORREO = s.correo)
                     WHEN NOT MATCHED THEN
                        INSERT (CODIGO_TURISTA, CORREO) VALUES (s.CODIGO_TURISTA, s.correo)`,
          { CODIGO_TURISTA, correo: email.value },
          { autoCommit: false }
        );
      }
    }

    await connection.commit();
  } catch (error) {
    if (connection) {
      await connection.rollback(); // Revertir cambios en caso de error
    }
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function deleteTurista(CODIGO_TURISTA) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `DELETE FROM TURISTA WHERE CODIGO_TURISTA = :CODIGO_TURISTA`,
      [CODIGO_TURISTA],
      { autoCommit: true }
    );
    await connection.execute(
      `DELETE FROM AGENCIA_VIAJES.TURISTA_TELEFONO WHERE CODIGO_TURISTA = :CODIGO_TURISTA`,
      [CODIGO_TURISTA],
      { autoCommit: true }
    );
    await connection.execute(
      `DELETE FROM AGENCIA_VIAJES.TURISTA_CORREO WHERE CODIGO_TURISTA = :CODIGO_TURISTA`,
      [CODIGO_TURISTA],
      { autoCommit: true }
    );
  } finally {
    if (connection) await connection.close();
  }
}

async function addTuristaContact(CODIGO_TURISTA, contacts) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const phoneInserts = contacts.TELEFONOS.map((phone) => ({
      sql: `INSERT INTO AGENCIA_VIAJES.TURISTA_TELEFONO (CODIGO_TURISTA, TELEFONO) VALUES (:CODIGO_TURISTA, :telefono)`,
      binds: { CODIGO_TURISTA, telefono: phone },
    }));
    const emailInserts = contacts.CORREOS.map((email) => ({
      sql: `INSERT INTO AGENCIA_VIAJES.TURISTA_CORREO (CODIGO_TURISTA, CORREO) VALUES (:CODIGO_TURISTA, :correo)`,
      binds: { CODIGO_TURISTA, correo: email },
    }));
    await connection.executeMany(phoneInserts);
    await connection.executeMany(emailInserts);
    await connection.commit();
  } finally {
    if (connection) await connection.close();
  }
}

// Función para obtener turistas junto con sus contactos
async function getAllTuristas() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Obtener todos los turistas
    const turistasResult = await connection.execute(`SELECT * FROM  AGENCIA_VIAJES.TURISTA`, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    const turistas = turistasResult.rows;

    for (const turista of turistas) {
      const { TELEFONOS, CORREOS } = await getTuristaContacts(turista.CODIGO_TURISTA);
      turista.CORREOS = CORREOS;
      turista.TELEFONOS = TELEFONOS;
    }

    return turistas;
  } catch (error) {
    console.error('Error fetching turistas:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  getTurista,
  getAllTuristas,
  getTuristaContacts,
  addTurista,
  updateTurista,
  updateContacts,
  deleteTurista,
  addTuristaContact,
};
