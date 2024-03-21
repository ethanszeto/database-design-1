import mysql from "mysql";

export default class Connection {
  static pool;
  static async login(username, password) {
    try {
      this.pool = mysql.createPool({
        connectionLimit: 10,
        host: "host.docker.internal",
        user: username,
        password: password,
        database: "harry_potter_book_v2",
        debug: false,
        timezone: "UTC",
      });

      //console.log(this.pool);
      return this.pool;
    } catch (e) {
      throw e;
    }
  }

  static async getThreadId(req, res) {
    if (!this.pool) {
      res.send({ result: "Not logged in!" });
      return;
    }

    this.pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.send({ result: "Failed to Connect" });
        return;
      }
      if (connection) {
        console.log("connected as id " + connection.threadId);
        res.send({ result: connection.threadId });
        connection.release();
        return;
      }
    });
  }

  static async close(pool) {
    //connection.end();
    pool.end();
  }
}
