import express from "express";
import cors from "cors";
import todosRoute from "./routes/todos.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todosRoute);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

