"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCars1643646989358 = void 0;

var _typeorm = require("typeorm");

/* eslint-disable prettier/prettier */
class CreateCars1643646989358 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "cars",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "daily_rate",
        type: "numeric"
      }, {
        name: "available",
        type: "boolean",
        default: true
      }, {
        name: "license_plate",
        type: "varchar"
      }, {
        name: "fine_amount",
        type: "numeric"
      }, {
        name: "brand",
        type: "varchar"
      }, {
        name: "category_id",
        type: "uuid",
        isNullable: true
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: "FK_Car_Category",
        referencedTableName: "categories",
        referencedColumnNames: ["id"],
        columnNames: ["category_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("cars");
  }

}

exports.CreateCars1643646989358 = CreateCars1643646989358;