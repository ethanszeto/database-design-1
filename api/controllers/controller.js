import Connection from "../db/connection.js";

export default class RequestController {
  static async login(req, res) {
    try {
      console.log(req.body);

      const pool = await Connection.login(req.body.username, req.body.password);

      res.send({ result: "Pool Created" });
    } catch (e) {
      console.log(e);
      res.send({ result: "Failure" });
    }
  }

  static async getThreadId(req, res) {
    Connection.getThreadId(req, res);
  }
}
