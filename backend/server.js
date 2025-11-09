import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import process from "process";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Projects endpoints
app.post("/projects/create", (req, res) => {
  const { name, status, description } = req.body;
  res.status(201).json({
    message: "Project created",
    project: { name, status, description },
  });
});

app.put("/projects/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, taskCounter, status } = req.body;
  res.status(200).json({
    message: "Project updated",
    project: { id, name, description, taskCounter, status },
  });
});

app.delete("/projects/delete/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Project with id ${id} deleted` });
});

// Tasks endpoints
app.post("/tasks/create", (req, res) => {
  const { title, description, author, status, projectId } = req.body;
  res.status(201).json({
    message: "Task created",
    task: { title, description, author, status, projectId },
  });
});

app.delete("/tasks/delete/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Task with id ${id} deleted` });
});

app.put("/tasks/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, author, status, projectId } = req.body;
  res.status(200).json({
    message: "Task updated",
    task: { id, title, description, author, status, projectId },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
