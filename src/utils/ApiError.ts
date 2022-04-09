import { ValidationError } from "joi";

export default class ApiError extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  static validationError(error: ValidationError) {
    const { details } = error;
    const list = details.map((i) => i.message);

    return new ApiError(422, list.join(" - "));
  }

  static authorizationError(error: Error) {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development" || env === "local";

    return new ApiError(401, isDevelopment ? error.message : "Invalid token");
  }
}
