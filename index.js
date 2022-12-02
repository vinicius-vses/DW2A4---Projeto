const express = require("express");
const server = express();
const router = express.Router();
const fs = require("fs");

server.use(express.json({ extended: true }));

const readFile = () => {
  const content = fs.readFileSync("./mock/user.json", "utf-8");
  res.send(JSON.parse(content));
};

const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync(".mock/user.json", JSON.stringify(currentContent), "utf8");
};

router.get("/", (req, res) => {
  const content = readFile();
  res.send(content);
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const currentContent = readFile();

  const id = Math.random().toString(8).substring(2, 10);
  currentContent.push({ id, email, password });
  writeFile(currentContent);
  res.send(id, email, password);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  const currentContent = readFile();
  const selectedUser = currentContent.findIndex((user) => user.id === id);

  const {
    id: cId,
    email: cEmail,
    password: cPassword,
  } = currentContent[selectedUser];

  const newObject = {
    id: cId,
    email: email ? email : cEmail,
    password: password ? password : cPassword,
  };

  currentContent[selectedUser] = newObject;
  writeFile(currentContent);

  res.send(newObject);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const currentFile = readFile();
  const selectedUser = currentContent.findIndex((user) => user.id === id);
  currentContent.splice(selectedUser, 1);
  writeFile(currentContent);
  res.send(true);
});

server.use(router);

server.listen(3000, () => {
  console.log("Rodando servidor");
});
