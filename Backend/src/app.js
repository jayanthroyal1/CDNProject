// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import compression from "compression";
// import morgan from "morgan";
// import path from "path";
// import mongoSanitize from "express-mongo-sanitize";

// import healthRoutes from "./routes/health.routes.js";
// import { requestIdMiddleware } from "./middleware/request-id.middleware.js";
// import { apiLimiter } from "./middleware/rate-limit.middleware.js";
// import { errorHandler } from "./middleware/error.middleware.js";
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import adminRoute from "./routes/admin.routes.js";
// import profileRoutes from "./routes/profile.routes.js";
// import contactRoutes from "./routes/contact.routes.js";
// import fileRoutes from "./routes/file.routes.js";
// import reportRoutes from "./routes/admin.routes.js";
// // import swaggerSetup from "./config/swagger.js";

// const app = express();

// app.use(cors());

// app.use(helmet());
// // when cloudfront is add
// // app.use(
// //   helmet({
// //     contentSecurityPolicy: false,
// //   }),
// // );

// app.use(compression());

// app.use(express.json());
// // swaggerSetup(app);

// app.use(
//   morgan("combined", {
//     stream: {
//       write: (message) => logger.info(message.trim()),
//     },
//   }),
// );
// app.use(requestIdMiddleware);
// app.use(apiLimiter);
// app.use(mongoSanitize());
// app.use("/uploads", express.static(path.resolve("uploads")));

// app.use("/api/v1/health", healthRoutes);
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/admin", adminRoute);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/files", fileRoutes);
// app.use("/api/v1/reports", reportRoutes);

// app.use(errorHandler);

// export default app;
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import path from "path";
import mongoSanitize from "express-mongo-sanitize";

import logger from "./logger/logger.js";
import { swaggerSetup } from "./config/swagger.js";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoute from "./routes/admin.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import fileRoutes from "./routes/file.routes.js";
import reportRoutes from "./routes/report.routes.js";

import { requestIdMiddleware } from "./middleware/request-id.middleware.js";
import { apiLimiter } from "./middleware/rate-limit.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());

swaggerSetup(app);

app.use(morgan("dev"));

app.use(requestIdMiddleware);

app.use(apiLimiter);

app.use((req, res, next) => {
  Object.defineProperty(req, "query", {
    value: { ...req.query },
    writable: true,
    configurable: true,
  });
  next();
});
app.use(mongoSanitize());

app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/v1/health", healthRoutes);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/admin", adminRoute);

app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/contact", contactRoutes);

app.use("/api/v1/files", fileRoutes);

app.use("/api/v1/reports", reportRoutes);

app.use(errorHandler);

export default app;
