import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

// @Entity("cars")
class Car {
  // @PrimaryColumn()
  id: string;

  // @Column()
  name: string;

  // @Column()
  description: string;

  // @Column()
  daily_rate: number;

  // @Column()
  available: boolean;

  // @Column()
  license_plate: string;

  // @Column()
  fine_amount: number;

  // @Column()
  brand: string;

  category_id: string;

  // @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
      this.created_at = new Date();
    }
  }
}

export { Car };
