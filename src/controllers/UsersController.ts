import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const userAlreadyExists = await UsersRepository.findByEmail(email);

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = UsersRepository.create({ name, email });

    await UsersRepository.save(user);

    return res.status(201).json(user);
  }
}
