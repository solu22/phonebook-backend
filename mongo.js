// const mongoose = require('mongoose')

// if(process.argv.length <3){
//     console.log("Please provide password as an argument, node mongo.js")
//     process.exit()
// }

// const password = process.argv[2]

// const url = `mongodb+srv://pasang:${password}@cluster0.5q8sj.mongodb.net/Phonebook?retryWrites=true&w=majority`
// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//     name: String,
//     number: Number,
// })

// const Contact = mongoose.model('Contact', personSchema )

// const new_person = new Contact({
//     name: 'Test1',
//     number: 000000000,
// })



// Contact. find({}).then(persons => {
//     persons.map(person => console.log(person))
//     mongoose.connection.close()
// })
