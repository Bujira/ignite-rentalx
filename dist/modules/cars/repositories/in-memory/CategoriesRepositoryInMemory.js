"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;

var _Category = require("../../infra/typeorm/entities/Category");

class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }

  async create({
    name,
    description
  }) {
    const category = new _Category.Category();
    Object.assign(category, {
      name,
      description
    });
    this.categories.push(category);
    return category;
  }

  async getByName({
    name
  }) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }

  async getAll() {
    const list = this.categories;
    return list;
  }

}

exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;