require('dotenv').config()
const express = require("express");

const app = express();
app.use(express.json());

const morgan = require("morgan");

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const cors = require("cors");
app.use(cors());

app.use(express.static("build"));

const Contact = require('./models/person')


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

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id).then(person=>{
    if(person){
      res.json(person)
    } else{
      res.status(404).end()
    }
  })
  .catch(error => next(error))
  })



app.put("api/persons/:id", (req, res, next)=>{
  const {name, number} = req.body
  const person = {
    name, number
  }
  Contact.findByIdAndUpdate(req.params.id, person, {new: true}).then(updatePerson =>{
    res.json(updatePerson)
  })
  .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
  .then(result =>{
    res.status(204).end()
  })
  .catch(error => next(error))
});

const errorHandler = (error, req, res, next)=>{
  console.log(error.message)

  if(error.name === 'CastError'){
    return res.status(400).send({ error: 'malformed id'})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
