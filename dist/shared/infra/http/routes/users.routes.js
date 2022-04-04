"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _upload = _interopRequireDefault(require("@config/upload"));

var _CreateUserController = require("@modules/accounts/useCases/createUser/CreateUserController");

var _UpdateUserAvatarController = require("@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController");

var _UserProfileController = require("@modules/accounts/useCases/userProfile/UserProfileController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
const userProfileController = new _UserProfileController.UserProfileController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", uploadAvatar.single("avatar"), _ensureAuthenticated.ensureAutehnticated, updateUserAvatarController.handle);
usersRoutes.get("/profile", _ensureAuthenticated.ensureAutehnticated, userProfileController.handle);