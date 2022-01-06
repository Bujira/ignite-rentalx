import { parse } from "csv-parse";
import fs from "fs";

interface IImportCategoryDTO {
  file: Express.Multer.File;
}

class ImportCategoryUseCase {
  constructor() {
    console.log(".");
  }

  execute({ file }: IImportCategoryDTO): void {
    const stream = fs.createReadStream(file.path);

    const parseFile = parse({
      delimiter: ",",
    });

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
