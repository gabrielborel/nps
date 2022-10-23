import { SurveysUsersRepository } from "./../repositories/SurveysUsersRepository";
import { Request, Response } from "express";

export class AnswerController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { value } = req.params;
    const { u } = req.query;

    const surveyUser = await SurveysUsersRepository.findOne({
      where: {
        id: String(u),
      },
    });

    if (!surveyUser)
      return res.status(400).json({ message: "Survey user does not exists." });

    surveyUser.value = Number(value);

    await SurveysUsersRepository.save(surveyUser);

    return res.status(200).json(surveyUser);
  }
}
