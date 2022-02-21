import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/typings/ICreateCarDTO";
import { IGetByIdDTO } from "@modules/cars/typings/IGetByIdDTO";
import { IGetByLicensePlateDTO } from "@modules/cars/typings/IGetByLicensePlateDTO";
import { IGetCarDTO } from "@modules/cars/typings/IGetCarDTO";
import { IUpdateCarStatusDTO } from "@modules/cars/typings/IUpdateCarStatusDTO";
import { getRepository, Repository } from "typeorm";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }
  async getByLicensePlate({
    license_plate,
  }: IGetByLicensePlateDTO): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async getById({ car_id }: IGetByIdDTO): Promise<Car> {
    const car = await this.repository.findOne({ id: car_id });

    return car;
  }

  async getAllAvailable({
    name,
    brand,
    category_id,
  }: IGetCarDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder()
      .where("available = :available", { available: true });

    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async updateStatus({ id, available }: IUpdateCarStatusDTO): Promise<Car> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();

    const car_id = id;

    const car = this.getById({ car_id });

    return car;
  }
}

export { CarsRepository };
