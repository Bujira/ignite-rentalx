"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarImages1643979208887 = void 0;

var _typeorm = require("typeorm");

/* eslint-disable prettier/prettier */
class CreateCarImages1643979208887 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "car_images",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "image_name",
        type: "varchar"
      }, {
        name: "car_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: "FK_Image_Car",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("car_images");
  }

}

exports.CreateCarImages1643979208887 = CreateCarImages1643979208887;