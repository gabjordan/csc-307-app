// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js"

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// IE4 - removed old helper functions
// modified call sites to use .then (for resolved promises) and .catch (for errors)

// IE3 TASK 2 - GENERATE ID
// IE3 TASK 3 - RETURN CREATED OBJECT
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.addUser(userToAdd)
    .then((createdUser) => {
      res.status(201).send(createdUser);
    })
    .catch((error) => {
      console.log(error);
    })
});

// IE2 TASK 1 - HARD DELETE
// IE3 TASK 4 - DELETE ON BACKEND
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];

    userService.findUserById(id)
      .then((user) => {
        if (!user) {
          res.status(404).send("Resource not found.");
          return;
        }
        else {
          return userService.deleteUser(id)
            .then(() => {
              res.status(204).send();
            });
        }
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
});

// removed find by both name AND job
// find by name only OR job only
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService.getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// find user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  userService.findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});