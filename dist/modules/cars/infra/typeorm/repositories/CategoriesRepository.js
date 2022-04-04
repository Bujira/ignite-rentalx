"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _typeorm = require("typeorm");

var _Category = require("../entities/Category");

class CategoriesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Category.Category);
  }

  async create({
    name,
    description
  }) {
    const category = this.repository.create({
      name,
      description
    });
    await this.repository.save(category);
    return category;
  }

  async getByName({
    name
  }) {
    const category = await this.repository.findOne({
      name
    });
    return category;
  }

  async getAll() {
    const categories = await this.repository.find();
    return categories;
  }

}

exports.CategoriesRepository = CategoriesRepository;