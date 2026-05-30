import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import healthRoutes from "./routes/health.routes.js";
import { requestIdMiddleware } from "./middleware/request-id.middleware.js";
import { apiLimiter } from "./middleware/rate-limit.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoute from "./routes/admin.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const app = express();

app.use(cors());

app.use(helmet());
// when cloudfront is add
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   }),
// );

app.use(compression());

app.use(express.json());

app.use(morgan("dev"));
app.use(requestIdMiddleware);
app.use(apiLimiter);

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/profile", profileRoutes);

app.use(errorHandler);

export default app;
