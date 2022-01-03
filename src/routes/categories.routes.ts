import { Router } from "express";
import { v4 as uuid } from "uuid";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const category = {
    id: uuid(),
    name,
    description,
  };

  categories.push(category);

  return response.status(201).json({ message: "Success!" });
});

export { categoriesRoutes };
