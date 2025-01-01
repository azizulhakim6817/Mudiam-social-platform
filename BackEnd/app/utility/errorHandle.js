//External Import
import fs from "fs";

//Create Custom Error
export const CreateError = (msg, status) => {
  const e = new Error(msg);
  e.status = status; //404
  return e;
};

//Not Found Error Handler (Middleware create)..
export const NotFoundError = (req, res, next) => {
  let data = req.originalUrl;
  const error = CreateError(`Your Requested ${data} `, 404);
  next(error);
};

//Default Error Handler (server off)
export const DefaultErrorHandler = (err, req, res, next) => {
  const message = err.message ? err.message : "Server Error Occured";
  const status = err.status ? err.status : 500;

  res.status(status).json({
    message,
    stack: err.stack,
  });

  //create error log file
  const logger = fs.createWriteStream("error.log", {
    flags: "a",
  });

  const logMes = message + "||" + err.stack + "||" + new Date() + "\n";
  logger.write(logMes);
};
