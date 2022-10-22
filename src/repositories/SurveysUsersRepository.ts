import { SurveyUser } from "./../models/SurveyUser";
import { dataSource } from "../database";

export const SurveysUsersRepository = dataSource
  .getRepository(SurveyUser)
  .extend({});
