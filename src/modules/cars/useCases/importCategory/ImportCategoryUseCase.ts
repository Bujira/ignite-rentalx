import { parse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategoryDTO {
  file: Express.Multer.File;
}

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
    console.log(".");
  }

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
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute({ file }: IImportCategoryDTO): Promise<void> {
    const categories = await this.loadCategories({ file });

    categories.map((category) => {
      const { name, description } = category;

      const categoryAlreadyExists = this.categoriesRepository.getByName({
        name,
      });

      if (categoryAlreadyExists) {
        throw new Error("Category already exists!");
      }

      return this.categoriesRepository.create({
        name,
        description,
      });
    });
  }
}

export { ImportCategoryUseCase };
