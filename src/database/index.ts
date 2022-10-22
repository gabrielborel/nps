import { DataSource } from "typeorm";
import { Survey } from "../models/Survey";
import { SurveyUser } from "../models/SurveyUser";
import { User } from "../models/User";
import { CreateUsers1666356344930 as CreateUsers } from "./migrations/1666356344930-CreateUsers";
import { CreateSurveys1666384351188 as CreateSurveys } from "./migrations/1666384351188-CreateSurveys";
import { CreateSurveysUsers1666392412398 as SurveysUsers } from "./migrations/1666392412398-CreateSurveysUsers";

export const dataSource = new DataSource({
  type: "sqlite",
  database:
    process.env.NODE_ENV === "test"
      ? "src/database/database.test.sqlite"
      : "src/database/database.sqlite",
  migrations: [CreateUsers, CreateSurveys, SurveysUsers],
  entities: [User, Survey, SurveyUser],
});
