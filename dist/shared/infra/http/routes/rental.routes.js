"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalsRoutes = void 0;

var _CreateRentalController = require("@modules/rentals/useCases/createRental/CreateRentalController");

var _GetRentalByUserController = require("@modules/rentals/useCases/getRentalByUser/GetRentalByUserController");

var _ReturnCarController = require("@modules/rentals/useCases/returnCar/ReturnCarController");

var _express = require("express");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const rentalsRoutes = (0, _express.Router)();
exports.rentalsRoutes = rentalsRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController();
const returnCarController = new _ReturnCarController.ReturnCarController();
const getRentalByUserController = new _GetRentalByUserController.GetRentalByUserController();
rentalsRoutes.post("/", _ensureAuthenticated.ensureAutehnticated, createRentalController.handle);
rentalsRoutes.post("/return/:rental_id", _ensureAuthenticated.ensureAutehnticated, returnCarController.handle);
rentalsRoutes.get("/", _ensureAuthenticated.ensureAutehnticated, getRentalByUserController.handle);