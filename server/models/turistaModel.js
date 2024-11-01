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
      `SELECT ID, NUM_TELEFONO FROM AGENCIA_VIAJES.TURISTA_TELEFONO WHERE CODIGO_TURISTA = :CODIGO_TURISTA`,
      [CODIGO_TURISTA],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    const emailResult = await connection.execute(
      `SELECT ID, CORREO FROM AGENCIA_VIAJES.TURISTA_CORREO WHERE CODIGO_TURISTA = :CODIGO_TURISTA`,
      [CODIGO_TURISTA],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return { TELEFONOS: phoneResult.rows, CORREOS: emailResult.rows };
  } finally {
    if (connection) await connection.close();
  }
}

async function addTurista(turista) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log(turista);
    await connection.execute(
      `INSERT INTO AGENCIA_VIAJES.TURISTA ( SUC_CONTRATADA, NOMBRE1, NOMBRE2, NOMBRE3, APELLIDO1, APELLIDO2,PAIS) 
      VALUES ( :sucContratada, :nombre1, :nombre2, :nombre3, :apellido1, :apellido2, :pais)`,
      {
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
  } catch (error) {
    console.log(error);
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

    // await connection.execute('BEGIN');

    // Proceso para teléfonos
    for (const phone of contacts.TELEFONOS) {
      console.log(phone);
      if (phone._delete) {
        // Eliminar el teléfono si `_delete` está en true
        await connection.execute(
          `DELETE FROM AGENCIA_VIAJES.TURISTA_TELEFONO 
                     WHERE CODIGO_TURISTA = :CODIGO_TURISTA 
                     AND NUM_TELEFONO = :telefono`,
          { CODIGO_TURISTA, telefono: phone.NUM_TELEFONO },
          { autoCommit: true }
        );
      } else {
        // Realizar un upsert para el teléfono
        await connection.execute(
          `MERGE INTO AGENCIA_VIAJES.TURISTA_TELEFONO t
           USING (SELECT :CODIGO_TURISTA AS CODIGO_TURISTA, :id AS ID, :telefono AS NUM_TELEFONO  FROM DUAL) s
           ON (t.ID = s.ID)
           WHEN MATCHED THEN
               UPDATE SET t.NUM_TELEFONO = s.NUM_TELEFONO
           WHEN NOT MATCHED THEN
               INSERT (CODIGO_TURISTA, NUM_TELEFONO)
               VALUES (s.CODIGO_TURISTA, s.NUM_TELEFONO)`,
          { CODIGO_TURISTA, id: phone.ID, telefono: phone.NUM_TELEFONO },
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
                     WHERE ID = :id`,
          { id: email.ID },
          { autoCommit: false }
        );
      } else {
        // Realizar un upsert para el correo
        await connection.execute(
          `MERGE INTO AGENCIA_VIAJES.TURISTA_CORREO t
             USING (SELECT :CODIGO_TURISTA AS CODIGO_TURISTA, :id AS ID, :correo AS CORREO  FROM DUAL) s
             ON (t.ID = s.ID)
             WHEN MATCHED THEN
                 UPDATE SET t.CORREO = s.CORREO
             WHEN NOT MATCHED THEN
                 INSERT (CODIGO_TURISTA, CORREO)
                 VALUES (s.CODIGO_TURISTA, s.CORREO)`,
          { CODIGO_TURISTA, id: email.ID, correo: email.CORREO },
          { autoCommit: false }
        );
      }
    }

    // await connection.execute('END');
    await connection.commit();
  } catch (error) {
    console.log(error);
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
      `DELETE FROM AGENCIA_VIAJES.TURISTA WHERE CODIGO_TURISTA = :CODIGO_TURISTA`,
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
  } catch (error) {
    console.log(error);

    throw error;
  } finally {
    if (connection) await connection.close();
  }
}

async function addTuristaContact(CODIGO_TURISTA, contacts) {
  let connection;

  const sqlPhone = `INSERT INTO AGENCIA_VIAJES.TURISTA_TELEFONO (CODIGO_TURISTA, NUM_TELEFONO) VALUES (:CODIGO_TURISTA, :telefono)`;
  const sqlEmail = `INSERT INTO AGENCIA_VIAJES.TURISTA_CORREO (CODIGO_TURISTA, CORREO) VALUES (:CODIGO_TURISTA, :correo)`;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const phoneBinds = contacts.TELEFONOS.map((phone) => ({
      CODIGO_TURISTA,
      telefono: phone.NUM_TELEFONO,
    }));

    const emailBinds = contacts.CORREOS.map((email) => ({
      CODIGO_TURISTA,
      correo: email.CORREO,
    }));

    const options = {
      autoCommit: true  // Asegura que los cambios se guarden automáticamente
    };


    await connection.executeMany(sqlPhone, phoneBinds, options);
    // await connection.executeMany(sqlEmail, emailBinds, options);
    // await connection.commit();
  } catch (error) {
    console.log(error);
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
