"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProfileController = void 0;

var _tsyringe = require("tsyringe");

var _UserProfileUseCase = require("./UserProfileUseCase");

class UserProfileController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const userProfileUseCase = _tsyringe.container.resolve(_UserProfileUseCase.UserProfileUseCase);

    const result = await userProfileUseCase.execute({
      id
    });
    return response.status(200).json({
      message: "Success!",
      result
    });
  }

}

exports.UserProfileController = UserProfileController;