"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _CreateCategoryController = require("@modules/cars/useCases/createCategory/CreateCategoryController");

var _GetCategoryController = require("@modules/cars/useCases/getCategory/GetCategoryController");

var _ImportCategoryController = require("@modules/cars/useCases/importCategory/ImportCategoryController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const upload = (0, _multer.default)({
  dest: "./tmp"
});
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController();
const getCategoryController = new _GetCategoryController.GetCategoryController();
categoriesRoutes.post("/", _ensureAuthenticated.ensureAutehnticated, _ensureAdmin.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get("/", getCategoryController.handle);
categoriesRoutes.post("/import", upload.single("file"), _ensureAuthenticated.ensureAutehnticated, _ensureAdmin.ensureAdmin, importCategoryController.handle);