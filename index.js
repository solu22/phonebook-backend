require('dotenv').config()
const express = require("express");
const app = express();
const Contact = require('./models/person')
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


app.get("/api/persons", (req, res) => {
  Contact. find({}).then(persons => {
    res.json(persons)
    
})
});

app.get("/info", (req, res) => {
  const getTotalEntries = persons.length;
  const date = new Date();

  res.send(
    `<p>Phonebook has info for ${getTotalEntries} people <br> ${date}</p>`
  );
});



app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: "fields are missing",
    });
  }

  const newPerson = new Contact({
    name,
    number,
    id: Math.floor(Math.random() * 701) + 1,
  });
  newPerson.save().then(savedPerson =>{
    res.json(savedPerson)
  })
});

app.get("/api/persons/:id", (req, res) => {
  Contact.findById(req.params.id).then(person=>{
    res.json(person)
    
  })
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
