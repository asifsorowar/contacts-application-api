import { Request, Response, NextFunction } from "express";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("The Error:", err);

  // formatted error message for database unique columns
  if (err.message?.includes("Unique constraint failed on")) {
    let fields = err.message
      .split("the fields: (`")[1]
      .split("`)")[0]
      .split(",");

    fields = fields.map((field) => `${field}: '${req.body[field]}'`);

    return res.status(400).send(`${fields} already existed!`);
  }

  if (err.name.includes("Error")) {
    return res.status(500).send("internal server error!");
  }

  return next(err);
};
