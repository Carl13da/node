const express = require("express");

const server = express();

server.use(express.json());

const users = ["Diego", "Victor", "Claudio"];

server.use((req, res, next) => {
  return next();
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Erro" });
  }

  return next();
}

function checkUserIndexExists(req, res, next) {
  const { index } = req.params;
  if (!users[index]) {
    return res.status(400).json({ error: "Erro" });
  }

  req.user = index;

  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserIndexExists, (req, res) => {
  return res.json(users[req.user]);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put(
  "/users/:index",
  checkUserExists,
  checkUserIndexExists,
  (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
  }
);

server.delete("/users/:index", checkUserIndexExists, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
