const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log(" connecting to ", url)

mongoose.connect(url).then(result=> {
    console.log("Connected to MongoDb")
})
.catch((error)=>{
    console.log("error connecting to MongoDb ", error.message)
})

const personSchema = new mongoose.Schema({
   name:{
     type: String,
     required: true,
     minlength: 3
   },
    number: {
      type: Number,
      required: true,
      minLength: 8
    },
})

personSchema.set('toJSON',{
  transform: (document, returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', personSchema)