import { dataSource } from "../database";
import { Survey } from "../models/Survey";

export const SurveysRepository = dataSource.getRepository(Survey).extend({});
