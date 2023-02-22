import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

app.get("/welcome", (req, res) => {
  return res.status(200).json("Bem vindo!");
});

// CRUD

const data = [];

app.post("/", (req, res) => {
  const entry = { ...req.body, id: uuidv4() };

  data.push(entry);

  return res.status(200).json(entry);
});

app.get("/", (req, res) => {
  return res.status(200).json(data);
});

app.get("/:entryId", (req, res) => {
  const { entryId } = req.params;
  const entry = data.find((e) => {
    return e.id === entryId;
  });

  return res.status(200).json(entry);
});

app.put(":entryUser", (req, res) => {
  let { entryUser } = req.params;

  let index;

  let user = data.find((e, i) => {
    index = i;
    return e.id === entryUser;
  });

  let updatedUser = { ...user, ...req.body };

  data.splice(index, 1);

  data.push(updatedUser);

  return res.status(200).json(updatedUser);
});

app.delete("/:entryUser", (req, res) => {
  let { entryUser } = req.params;
  let deleted = data.filter((e) => e.id !== entryUser);
  data = deleted;
  return res.status(200).json(data);
});

app.listen(4000, () => {
  console.log("Server up and runing at port 4000.");
});
