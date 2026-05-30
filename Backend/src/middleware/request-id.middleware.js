import { v4 as uuidv4 } from "uuid";

export const requestIdMiddleware = (req, res, next) => {
  req.requestId = uuidv4();

  res.setHeader("x-request-id", req.requestId);
  next();
};

// helps in production debugging - to find with x-request-id in logs
