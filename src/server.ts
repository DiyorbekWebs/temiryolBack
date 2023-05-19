import * as express from "express";
require("dotenv").config();
import * as http from "http";
import * as cors from "cors";
import * as fileUpload from "express-fileupload";
import * as path from "path";
import { TypeOrmDataSource } from "./config";

const app: express.Application = express();
const server = http.createServer(app);

TypeOrmDataSource.initialize()
  .then(() => {
    const { adminRouter, filialRouter } = require("./router");
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());
    app.use(express.static(process.cwd() + "/uploads"));
    app.use(fileUpload());
    app.use(adminRouter, filialRouter);

    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
