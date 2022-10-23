import { SurveysUsersRepository } from "./../repositories/SurveysUsersRepository";
import { SurveysRepository } from "./../repositories/SurveysRepository";
import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";

export class SendMailController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { email, survey_id } = req.body;

    const user = await UsersRepository.findOne({
      where: {
        email,
      },
    });
    const survey = await SurveysRepository.findOne({
      where: { id: survey_id },
    });

    if (!user)
      return res.status(400).json({ message: "User doest not exists!" });
    if (!survey)
      return res.status(400).json({ message: "Survey does not exists!" });

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const variables = {
      name: user.name,
      to: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    const surveyUserAlreadyExists = await SurveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survey"],
    });

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return res.json(surveyUserAlreadyExists);
    }

    const surveyUser = SurveysUsersRepository.create({
      survey_id: survey.id,
      user_id: user.id,
    });
    variables.id = surveyUser.id;

    await SurveysUsersRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return res.json(surveyUser);
  }
}
