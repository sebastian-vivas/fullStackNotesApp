const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');

// The database name is "notesApp" and the collection is "notes".
// username: developer
// password: ABC123
const uri = "mongodb+srv://developer:ABC123@database.rtodijr.mongodb.net/?retryWrites=true&w=majority";

const PORT = 3001;
app.listen(PORT)
console.log(`Server running on port ${PORT}`)