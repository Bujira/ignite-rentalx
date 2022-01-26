import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategoryDTO {
  file: Express.Multer.File;
}

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) { }

  loadCategories({ file }: IImportCategoryDTO): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];

      const parseFile = parse({
        delimiter: ",",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          const category = {
            name,
            description,
          };

          categories.push(category);
        })
        .on("end", () => {
          fs.promises.unlink(file.path); // removes imported file
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute({ file }: IImportCategoryDTO): Promise<void> {
    const categories = await this.loadCategories({ file });

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.getByName({
        name,
      });

      if (categoryAlreadyExists) {
        throw new AppError("Category already exists!");
      }

      return this.categoriesRepository.create({
        name,
        description,
      });
    });
  }
}

export { ImportCategoryUseCase };
