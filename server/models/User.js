const { oracledb } = require('../config/dbConfig');

class User {
  static async createUser({ username, email, password }) {
    const connection = await oracledb.getConnection();
    try {
      const result = await connection.execute(
        `INSERT INTO users (username, email, password) VALUES (:username, :email, :password)`,
        { username, email, password },
        { autoCommit: true }
      );
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      await connection.close();
    }
  }

  static async getAllUsers() {
    const connection = await oracledb.getConnection();
    try {
      const result = await connection.execute(`SELECT * FROM users`);
      return result.rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    } finally {
      await connection.close();
    }
  }
}

module.exports = User;
