import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import "./database";
import { router } from "./routes";
import { dataSource } from "./database";

dotenv.config();

dataSource.initialize();

export const app = express();

app.use(express.json());

app.use(router);
