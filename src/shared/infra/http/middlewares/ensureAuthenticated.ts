import auth from "@config/auth";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
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

  const userTokensRepository = new UserTokensRepository();

  if (!authHeader) {
    throw new AppError("Token is missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.refresh_token_secret
    ) as IAuthenticatePayload;

    const user = await userTokensRepository.getByUserIdAndByRefreshToken({
      user_id,
      token,
    });

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
