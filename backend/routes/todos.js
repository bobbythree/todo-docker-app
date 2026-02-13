import express from "express";
import db from "../db/connection.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM todos ORDER BY created_at DESC");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  await db.query("INSERT INTO todos (title) VALUES (?)", [title]);
  res.status(201).json({ message: "Todo created" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM todos WHERE id = ?", [id]);
  res.json({ message: "Todo deleted" });
});

export default router;

