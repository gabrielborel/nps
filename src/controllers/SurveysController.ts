import { SurveysRepository } from "./../repositories/SurveysRepository";
import { Request, Response } from "express";

export class SurveysController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;

    const survey = SurveysRepository.create({
      title,
      description,
    });

    await SurveysRepository.save(survey);

    return res.status(201).json(survey);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const allSurveys = await SurveysRepository.find();

    return res.json(allSurveys);
  }
}
