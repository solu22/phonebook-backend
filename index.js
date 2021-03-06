/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')

const app = express()
app.use(express.json())

const morgan = require('morgan')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

const Contact = require('./models/person')
const { response } = require('express')



app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({
      error: 'fields are missing',
    })
  }

  if(name.length!== 3 || number.length!==8 ){
    return res.status(400).json('name and num length should match')
  }

  const newPerson = new Contact({
    name,
    number,
    id: Math.floor(Math.random() * 701) + 1,
  })
  newPerson.save().then(savedPerson => {
    return savedPerson.toJSON()
  })
    .then(savedFormattedPerson => {
      res.json(savedFormattedPerson)
    })
    .catch(error => next(error))
})




app.get('/api/persons', (req, res) => {
  Contact. find({}).then(persons => {
    res.json(persons)

  })
})



app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id).then(person => {
    if(person){
      res.json(person)
    } else{
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const person = {
    name, number
  }
  Contact.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatePerson => {
      res.json(updatePerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if(error.name === 'CastError'){
    return res.status(400).send({ error: 'malformed id' })
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
