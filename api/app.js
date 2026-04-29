const express = require("express");
const carRouter = require("./routes/carRoutes");
const customerRouter = require("./routes/customerRoutes");
const saleRouter = require("./routes/saleRoutes");
const supllierRouter = require("./routes/supplierRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const userRouter = require("./routes/userRoutes");
const purchaseRouter = require("./routes/purchaseRoutes");
const installmentRouter = require("./routes/installmentRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const app = express();

app.use(helmet());

// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:5173", "https://car-system-fawn.vercel.app"],
//   })
// );

const limiter = rateLimit({
  max: 1000000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

app.use(cors());
// app.use(
//   cors({
//     credentials: true,
//     origin: "https://donia-gamma.vercel.app",
//   })
// );
app.options("*", cors());

app.use((req, res, next) => {
  console.log("Incoming origin:", req.headers.origin);
  next();
});

app.use(express.json({ limit: "3mb" }));

app.use(mongoSanitize());

app.use(xss());
app.use(hpp());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/cars", carRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/suppliers", supllierRouter);
app.use("/api/v1/sales", saleRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/purchases", purchaseRouter);
app.use("/api/v1/installments", installmentRouter);
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running 🚀",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
