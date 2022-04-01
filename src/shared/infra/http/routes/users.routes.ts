import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { UserProfileController } from "@modules/accounts/useCases/userProfile/UserProfileController";
import { Router } from "express";
import multer from "multer";

import { ensureAutehnticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  ensureAutehnticated,
  updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAutehnticated, userProfileController.handle);

export { usersRoutes };
