import express from "express";
import "dotenv/config";
import cors from "cors";
import e from "express";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
     
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Healthy",
  });
});

// auth
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
