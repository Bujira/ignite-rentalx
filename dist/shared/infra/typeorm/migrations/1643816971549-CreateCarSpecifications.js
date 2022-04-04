"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecifications1643816971549 = void 0;

var _typeorm = require("typeorm");

/* eslint-disable prettier/prettier */
class CreateCarSpecifications1643816971549 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "car_specifications",
      columns: [{
        name: "car_id",
        type: "uuid"
      }, {
        name: "specification_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
    await queryRunner.createForeignKey("car_specifications", new _typeorm.TableForeignKey({
      name: "FK_Car_Specifications_Car",
      referencedTableName: "cars",
      referencedColumnNames: ["id"],
      columnNames: ["car_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
    await queryRunner.createForeignKey("car_specifications", new _typeorm.TableForeignKey({
      name: "FK_Car_Specifications_Specification",
      referencedTableName: "specifications",
      referencedColumnNames: ["id"],
      columnNames: ["specification_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey("car_specifications", "FK_Car_Specifications_Specification");
    await queryRunner.dropForeignKey("car_specifications", "FK_Car_Specifications_Car");
    await queryRunner.dropTable("car_specifications");
  }

}

exports.CreateCarSpecifications1643816971549 = CreateCarSpecifications1643816971549;