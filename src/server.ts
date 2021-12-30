import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Hello World!!!" });
});

app.listen(3000, () => console.log("Server is running..."));
