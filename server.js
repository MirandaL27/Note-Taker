const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const notes = require('./db/db.json');
const { filterByQuery, makeNewNote, validateNote, updateNote, deleteNote} = require('./lib/notes');

const PORT = process.env.PORT || 3001;

  // parse incoming string or array data
  app.use(express.urlencoded({ extended: true }));
  // parse incoming JSON data
  app.use(express.json());
  app.use(express.static('public'));


 app.get('/api/notes', (req, res) => {
    //return notes here - filterByQuery
    let filteredNotes = notes;
    if(req.query){
      filteredNotes = filterByQuery(filteredNotes, req.query);
    }
    res.json(filteredNotes);
 }) 
 //need a post route for posting new notes
 app.post('/api/notes', (req, res) => {
     // set id based on what the next index of the array will be
     console.log(notes);
   req.body.id = notes.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = makeNewNote(notes, req.body);
    res.json(note);
  }
 })
 //need a route for deleting notes
 app.delete('/api/notes', (req, res) => {

 })

 app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
 })

//  app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
//   });

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });