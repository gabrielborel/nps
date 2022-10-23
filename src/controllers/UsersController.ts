import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from "yup";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup
        .string()
        .email("Email inválido")
        .required("Email é obrigatório"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err });
    }

    const userAlreadyExists = await UsersRepository.findByEmail(email);

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = UsersRepository.create({ name, email });
    await UsersRepository.save(user);

    return res.status(201).json(user);
  }
}
