import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import router from "./routes/router.js";
import requestsRouter from "./routes/requests.router.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use("/public", express.static(process.cwd() + "/public"));

app.use("/", router);
app.use("/requests", requestsRouter);

export default app;
