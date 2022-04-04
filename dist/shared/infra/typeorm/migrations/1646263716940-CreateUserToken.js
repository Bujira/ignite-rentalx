"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserToken1646263716940 = void 0;

var _typeorm = require("typeorm");

/* eslint-disable prettier/prettier */
class CreateUserToken1646263716940 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "users_tokens",
      columns: [{
        name: "id",
        type: "uuid"
      }, {
        name: "refresh_token",
        type: "varchar"
      }, {
        name: "user_id",
        type: "uuid"
      }, {
        name: "expiration_date",
        type: "timestamp"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: "FK_Token_User",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("users_tokens");
  }

}

exports.CreateUserToken1646263716940 = CreateUserToken1646263716940;