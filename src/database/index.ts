import { DataSource } from "typeorm";
import { Survey } from "../models/Survey";
import { User } from "../models/User";
import { CreateUsers1666356344930 as CreateUsers } from "./migrations/1666356344930-CreateUsers";
import { CreateSurveys1666384351188 as CreateSurveys } from "./migrations/1666384351188-CreateSurveys";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "src/database/database.sqlite",
  migrations: [CreateUsers, CreateSurveys],
  entities: [User, Survey],
});

dataSource
  .initialize()
  .then(() => console.log("dataSource initialized"))
  .catch((err) => console.log(err));
