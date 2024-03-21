import express from "express";
import bodyParser from "body-parser";
import path from "path";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.route("/").get((req, res) => {
  res.json({});
});

export default router;
