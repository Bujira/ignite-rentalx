/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCarSpecifications1643816971549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "car_specifications",
                columns: [
                    {
                        name: "car_id",
                        type: "uuid",
                    },
                    {
                        name: "specification_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "car_specifications",
            new TableForeignKey({

                name: "FK_Car_Specifications_Car",
                referencedTableName: "cars",
                referencedColumnNames: ["id"],
                columnNames: ["car_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",

            })
        );

        await queryRunner.createForeignKey(
            "car_specifications",
            new TableForeignKey({

                name: "FK_Car_Specifications_Specification",
                referencedTableName: "specifications",
                referencedColumnNames: ["id"],
                columnNames: ["specification_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",

            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("car_specifications", "FK_Car_Specifications_Specification");
        await queryRunner.dropForeignKey("car_specifications", "FK_Car_Specifications_Car");
        await queryRunner.dropTable("car_specifications");
    }

}
