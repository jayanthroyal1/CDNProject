import AppError from "../utils/app-error.js";

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      next(new AppError(err.issues?.[0]?.message || "Validation Error", 400));
    }
  };
};
