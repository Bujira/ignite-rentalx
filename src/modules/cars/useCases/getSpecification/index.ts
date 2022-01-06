import { specificationsRepository } from "..";

import { GetSpecificationController } from "./GetSpecificationController";
import { GetSpecificationUseCase } from "./GetSpecificationUseCase";

const getSpecificationUseCase = new GetSpecificationUseCase(
  specificationsRepository
);

const getSpecificationController = new GetSpecificationController(
  getSpecificationUseCase
);

export { getSpecificationController };
