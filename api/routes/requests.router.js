import express from "express";
import bodyParser from "body-parser";
import RequestController from "../controllers/controller.js";
import path from "path";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.route("/login").post(RequestController.login);

router.route("/thread-id").post(RequestController.getThreadId);

export default router;
