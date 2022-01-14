import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { GetSpecificationController } from "./GetSpecificationController";
import { GetSpecificationUseCase } from "./GetSpecificationUseCase";

export default (): GetSpecificationController => {
  const specificationsRepository = new SpecificationsRepository();
  const getSpecificationUseCase = new GetSpecificationUseCase(
    specificationsRepository
  );

  const getSpecificationController = new GetSpecificationController(
    getSpecificationUseCase
  );

  return getSpecificationController;
};
