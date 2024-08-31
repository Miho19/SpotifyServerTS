import { Request, Response, NextFunction } from "express";

function invalid(req: Request, res: Response, next: NextFunction) {
  res
    .status(404)
    .json({ status: 404, title: "Not Found", message: "Not a valid route" });
}

export default invalid;
