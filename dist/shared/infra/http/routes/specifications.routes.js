"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;

var _CreateSpecificationController = require("@modules/cars/useCases/createSpecification/CreateSpecificationController");

var _GetSpecificationController = require("@modules/cars/useCases/getSpecification/GetSpecificationController");

var _express = require("express");

var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");

var _ensureAdmin = require("../middlewares/ensureAdmin");

const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
const getSpecificationController = new _GetSpecificationController.GetSpecificationController();
specificationsRoutes.post("/", _ensureAuthenticated.ensureAutehnticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);
specificationsRoutes.get("/", getSpecificationController.handle);