// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };
const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
const findUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter(
      (user) => user.name === name && user.job === job
    );
  };
app.use(cors());
app.use(express.json());
  
  
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
  });

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const userIndex = users["users_list"].findIndex((user) => user.id === id);
     if (userIndex === -1) {
        res.status(404).send("User not found.");
  } else {
    users["users_list"].splice(userIndex, 1);
     res.send();
  }
});


app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result;
    if (name && job) {
     result = findUsersByNameAndJob(name, job);
    } else {
      result = users["users_list"];
    }
  
    res.send(result);
  });
  
app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
