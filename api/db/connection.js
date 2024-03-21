import mysql from "mysql";

export default class Connection {
  static async open(username, password) {
    var connection = mysql.createConnection({
      host: "127.0.0.1",
      user: username,
      password: password,
    });

    connection.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }
}
