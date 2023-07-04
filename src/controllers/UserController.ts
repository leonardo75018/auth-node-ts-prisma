import { Request, Response } from "express";
import prisma from "../outils/prisma";
import { hash } from "bcrypt";

export class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  async createUser(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      return res.send("User already existe");
    }

    const hashPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPassword,
      },
    });

    return res.status(200).json(user);
  }
}
