"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoryInMemory = void 0;

var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");

class SpecificationsRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name,
      description
    });
    this.specifications.push(specification);
    return specification;
  }

  async getByName({
    name
  }) {
    return this.specifications.find(specification => specification.name === name);
  }

  async getByIds({
    ids
  }) {
    const allSpecifications = this.specifications.filter(specification => ids.includes(specification.id));
    return allSpecifications;
  }

  async getAll() {
    return this.specifications;
  }

}

exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;