import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/glovalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import validator from "./app/middlewares/validator";

const app = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://next-shop-e-commerce.netlify.app",
      "http://next-shop-e-commerce.netlify.app",
      "https://660eb89398624204c4f97d7b--next-shop-e-commerce.netlify.app/",
      "http://660eb89398624204c4f97d7b--next-shop-e-commerce.netlify.app/",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(cookieParser());
app.use(validator);

// application route
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to E-commerce API",
  });
});

// global error handler
app.use(globalErrorHandler);
// not found handler
app.use(notFound);

export default app;
