import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoriesRepository = new CategoriesRepository();

  const result = categoriesRepository.create({ name, description });

  return response.status(201).json({
    message: "Success!",
    result,
  });
});

export { categoriesRoutes };
