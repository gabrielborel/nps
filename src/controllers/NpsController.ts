import { SurveysUsersRepository } from "./../repositories/SurveysUsersRepository";
import { Request, Response } from "express";
import { Not, IsNull } from "typeorm";

export class NpsController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { survey_id } = req.params;

    const surveysUsers = await SurveysUsersRepository.find({
      where: {
        survey_id,
        value: Not(IsNull()),
      },
    });

    const detractors = surveysUsers.filter(
      (surveyUser) => surveyUser.value >= 0 && surveyUser.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (surveyUser) => surveyUser.value >= 9 && surveyUser.value <= 10
    ).length;

    const passives = surveysUsers.filter(
      (surveyUser) => surveyUser.value >= 7 && surveyUser.value <= 8
    ).length;

    const respondants = surveysUsers.length;

    const score = Number(
      (((promoters - detractors) / respondants) * 100).toFixed(2)
    );

    return res.status(200).json({
      detractors,
      passives,
      promoters,
      totalAnswers: respondants,
      nps: score,
    });
  }
}
