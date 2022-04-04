"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;

var _typeorm = require("typeorm");

var _Specification = require("../entities/Specification");

class SpecificationsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Specification.Specification);
  }

  async create({
    name,
    description
  }) {
    const specification = this.repository.create({
      name,
      description
    });
    await this.repository.save(specification);
    return specification;
  }

  async getByName({
    name
  }) {
    const specification = await this.repository.findOne({
      name
    });
    return specification;
  }

  async getByIds({
    ids
  }) {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }

  async getAll() {
    const specifications = await this.repository.find();
    return specifications;
  }

}

exports.SpecificationsRepository = SpecificationsRepository;