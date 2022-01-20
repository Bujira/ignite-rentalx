import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { IAuthenticatePayload } from "../modules/accounts/typings/IAuthenticate";

export async function ensureAutehnticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "22cc62deef066466c6ff6ef9385cdbb6"
    ) as IAuthenticatePayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.getById({ id: user_id });

    if (!user) {
      throw new AppError("User does not exist!", 404);
    }

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
