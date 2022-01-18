import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { IAuthenticatePayload } from "../modules/accounts/typings/IAuthenticate";

export async function ensureAutehnticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token is missing!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = verify(
      token,
      "22cc62deef066466c6ff6ef9385cdbb6"
    ) as IAuthenticatePayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.getById({ id });

    if (!user) {
      throw new Error("User does not exist!");
    }

    return next();
  } catch {
    throw new Error("Inalid token!");
  }
}
