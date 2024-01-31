const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

// The database name is "notesApp" and the collection is "notes".
// username: developer
// password: ABC123
const uri = "mongodb+srv://developer:ABC123@database.rtodijr.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false)
mongoose.connect(url)

const PORT = 3001;
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

// Section for deleting notes
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id != id)
    response.status(204).end()
})

// Sections for posting notes
app.post('/api/notes', (request, response) => {
    const note = request.body
    console.log(note)
    response.json(note)
})

// Section for getting notes
app.get('/api/notes', (request, response) => {
    response.json
})

// Section for updating notes (text)


// Section for updating notes (pin)


// Section for updating notes


// Add marker that note is important


