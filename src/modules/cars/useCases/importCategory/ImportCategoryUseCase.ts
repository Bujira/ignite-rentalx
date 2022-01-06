interface IImportCategoryDTO {
  file: any;
}

class ImportCategoryUseCase {
  constructor() {
    console.log(".");
  }

  execute({ file }: IImportCategoryDTO) {
    console.log(file);
  }
}

export { ImportCategoryUseCase };
