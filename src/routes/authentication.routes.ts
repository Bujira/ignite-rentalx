import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticationRoutes.post("/auth", authenticateUserController.handle);

export { authenticationRoutes };
