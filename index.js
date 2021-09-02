const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

const cors = require("cors");
app.use(cors());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("build"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const getTotalEntries = persons.length;
  const date = new Date();

  res.send(
    `<p>Phonebook has info for ${getTotalEntries} people <br> ${date}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: "fields are missing",
    });
  }
  const foundPerson = persons.find(
    (person) => person.name === name || person.number === number
  );
  if (foundPerson) {
    return res.status(401).json({
      error: "person already exists in phonebook",
    });
  }

  const newPerson = {
    name,
    number,
    id: Math.floor(Math.random() * 701) + 1,
  };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const foundPerson = persons.find((person) => person.id === id);
  if (foundPerson) {
    return res.json(foundPerson.name);
  } else {
    return res.status(400).json({
      error: "no such person found",
    });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
