import express from "express";
import bodyParser from "body-parser";
import RequestController from "../controllers/controller.js";
import path from "path";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.route("/login").post(RequestController.login);

router.route("/thread-id").post(RequestController.getThreadId);

router.route("/get-spell-types").post(RequestController.getSpellTypes);

router.route("/get-spells-with-type").post(RequestController.getSpellsWithType);

router.route("/close").post(RequestController.closeConnection);

export default router;
