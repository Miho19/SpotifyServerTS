import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
}

export default errorHandler;
