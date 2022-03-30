import auth from "@config/auth";
import { IAuthenticatePayload } from "@modules/accounts/typings/IAuthenticate";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

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
      auth.token_secret
    ) as IAuthenticatePayload;

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
