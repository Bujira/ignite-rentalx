"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentals1644255767066 = void 0;

var _typeorm = require("typeorm");

/* eslint-disable prettier/prettier */
class CreateRentals1644255767066 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "rentals",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "car_id",
        type: "uuid"
      }, {
        name: "user_id",
        type: "uuid"
      }, {
        name: "start_date",
        type: "timestamp",
        default: "now()"
      }, {
        name: "end_date",
        type: "timestamp",
        isNullable: true
      }, {
        name: "expected_return_date",
        type: "timestamp"
      }, {
        name: "total",
        type: "numeric",
        isNullable: true
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: "FK_Rental_Car",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      }, {
        name: "FK_Rental_User",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("rentals");
  }

}

exports.CreateRentals1644255767066 = CreateRentals1644255767066;