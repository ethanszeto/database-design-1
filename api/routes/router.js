import express from "express";
import bodyParser from "body-parser";
import path from "path";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

/* Default Page Router */
router.route("/").get((req, res) => {
  res.sendFile(path.resolve() + "/public/html/index.html");
});

/* Main CSS Router */
router.route("/public/css/:style.css").get((req, res) => {
  res.sendFile(path.resolve() + `public/css/${req.params.style}.css`);
});

/* Main JS Router */
router.route("/public/js/:script.js").get((req, res) => {
  res.sendFile(path.resolve() + `public/js/${req.params.script}.js`);
});

export default router;
