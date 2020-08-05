import express from "express";
import { HttpError } from "http-errors";

interface IError {
  message: string;
  status: number;
}

interface IErrorDTO {
  error: IError;
}

export default function ErrorHandler(err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void {
  const status: number = err.status || 500;
  const message: string = err.message || "Unknown error";
  const dto: IErrorDTO = {
    error: {
      message,
      status,
    },
  };
  res.status(status);
  res.send(dto);
}