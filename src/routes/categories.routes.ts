import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const result = categoriesRepository.create({ name, description });

  return response.status(201).json({
    message: "Success!",
    result,
  });
});

categoriesRoutes.get("/", (request, response) => {
  const result = categoriesRepository.getAll();
  return response.status(200).json({
    message: "Success!",
    result,
  });
});

export { categoriesRoutes };
