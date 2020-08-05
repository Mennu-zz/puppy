import "reflect-metadata";
import dotenv from "dotenv";
import { InversifyExpressServer } from "inversify-express-utils";
import ErrorHandler from './middlewares/errorHandler.middleware';
dotenv.config();

import express from "express";
import helmet from "helmet";

import { ContainerLoader } from "./container";
const app: express.Application = express();

const container = ContainerLoader.load();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const server = new InversifyExpressServer(container, null, null, app);
const serverInstance = server.build();
serverInstance.use(ErrorHandler);

if (require.main === module) {
    serverInstance.listen(process.env.PORT);
    console.log(`Server started on port ${process.env.PORT}`);
}

export default serverInstance;