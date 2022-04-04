"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModifyUserDeleteUsername1642511605114 = void 0;

var _typeorm = require("typeorm");

/* eslint-disable prettier/prettier */
class ModifyUserDeleteUsername1642511605114 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar"
    }));
  }

}

exports.ModifyUserDeleteUsername1642511605114 = ModifyUserDeleteUsername1642511605114;