import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const result = categoriesRepository.create({ name, description });

  if (result === 1) {
    return response.status(400).json({ error: "Category Already Exists!" });
  }

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
