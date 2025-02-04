import express from "express";
import cors from "cors";
import userService from "./user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userService
    .getUsers(name, job)
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.get("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(200).json(user);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then((newUser) => res.status(201).json(newUser))
    .catch((error) => res.status(400).json({ error: error.message }));
});

app.delete("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      return user.deleteOne();
    })
    .then(() => res.status(204).send())
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
